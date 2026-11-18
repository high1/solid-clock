import { createSignal, flush } from 'solid-js';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { ANIMATION_DURATION } from '#src/clock-animation';
import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { render } from '#src/testing/render';
import { getTimeZone, setNow } from '#src/time';

// `now` is a module-level singleton, so every test starts from a known clock
// rather than inheriting whatever the previous test left behind.
const setLocalTime = (hours = 0, minutes = 0, seconds = 0) => {
  vi.setSystemTime(new Date(2020, 0, 1, hours, minutes, seconds, 0));
  setNow(Date.now());
  flush();
};

beforeEach(() => {
  vi.useFakeTimers();
  setLocalTime();
});

afterEach(() => {
  vi.useRealTimers();
});

// Minute and second hands share the same domain: 0–59 units, 6° per unit.
const minuteSecondCases = [
  [0, 'rotate(0)'],
  [1, 'rotate(6)'],
  [15, 'rotate(90)'],
  [30, 'rotate(180)'],
  [59, 'rotate(354)'],
] as const;

describe('<ClockHands /> in a fixed zone', () => {
  test.each([
    [0, 'rotate(0)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
  ])('renders hour %i in UTC as %s', (hours, transform) => {
    setNow(Date.UTC(2020, 0, 1, hours, 0, 0, 0));
    flush();
    const screen = render(() => <ClockHands zone="UTC" />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  test('renders second 15 in UTC', () => {
    setNow(Date.UTC(2020, 0, 1, 0, 0, 15, 0));
    flush();
    const screen = render(() => <ClockHands zone="UTC" />);
    expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
      'transform',
      'rotate(90)',
    );
    screen.unmount();
  });

  test.each(minuteSecondCases)(
    'renders minute %i in UTC as %s',
    (minutes, transform) => {
      setNow(Date.UTC(2020, 0, 1, 0, minutes, 0, 0));
      flush();
      const screen = render(() => <ClockHands zone="UTC" />);
      expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i in UTC as %s',
    (seconds, transform) => {
      setNow(Date.UTC(2020, 0, 1, 0, 0, seconds, 0));
      flush();
      const screen = render(() => <ClockHands zone="UTC" />);
      expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );
});

describe('<ClockHands />', () => {
  test.each([
    [0, 'rotate(0)'],
    [1, 'rotate(30)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
    [12, 'rotate(0)'],
  ])('renders hour %i as %s', (hours, transform) => {
    setLocalTime(hours);
    const screen = render(() => <ClockHands zone={getTimeZone()} />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  test('defaults to the runtime timezone', () => {
    setLocalTime(3);
    const screen = render(() => <ClockHands />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(90)',
    );
    screen.unmount();
  });
});

describe('<ClockHands /> zone change animation', () => {
  const start = Date.UTC(2020, 0, 1, 0, 0, 0, 0);
  const mid = ANIMATION_DURATION / 5;

  const angleOf = (el: Element | null) =>
    Number(el?.getAttribute('transform')?.split('(')[1]?.split(')')[0]);

  test('animates the hour hand when the zone changes', () => {
    setNow(start);
    flush();
    const [zone, setZone] = createSignal('UTC');
    const screen = render(() => <ClockHands zone={zone()} />);

    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Europe/Berlin is UTC+1, so the hour hand moves from 0° to 30°.
    setZone('Europe/Berlin');
    flush();

    // Mid-animation: the hand is between the old and the new position.
    setNow(start + mid);
    flush();
    expect(screen.getByTestId(clockHourId)).not.toHaveAttribute(
      'transform',
      'rotate(0)',
    );
    expect(screen.getByTestId(clockHourId)).not.toHaveAttribute(
      'transform',
      'rotate(30)',
    );

    // Animation complete.
    setNow(start + ANIMATION_DURATION);
    flush();
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(30)',
    );
    screen.unmount();
  });

  test('animates the minute hand when the zone changes', () => {
    setNow(start);
    flush();
    const [zone, setZone] = createSignal('UTC');
    const screen = render(() => <ClockHands zone={zone()} />);

    expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Asia/Kathmandu is UTC+5:45, so the minute hand moves from 0° to 270°.
    setZone('Asia/Kathmandu');
    flush();

    setNow(start + mid);
    flush();
    expect(screen.getByTestId(clockMinuteId)).not.toHaveAttribute(
      'transform',
      'rotate(0)',
    );
    expect(screen.getByTestId(clockMinuteId)).not.toHaveAttribute(
      'transform',
      'rotate(270)',
    );

    setNow(start + ANIMATION_DURATION);
    flush();
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      270,
      0,
    );
    screen.unmount();
  });

  test('does not animate when switching between zones with the same offset', () => {
    // France and Germany share the same DST rules (CET/CEST).
    // At 00:00 UTC both show 01:00 (CET, UTC+1 in January).
    setNow(start);
    flush();
    const [zone, setZone] = createSignal('Europe/Paris');
    const screen = render(() => <ClockHands zone={zone()} />);

    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(30)',
    );

    setZone('Europe/Berlin');
    flush();

    setNow(start + ANIMATION_DURATION);
    flush();
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(30)',
    );
    screen.unmount();
  });

  test('animates forward across zones more than 12h apart', () => {
    // LA (UTC−8 in January) → Sydney (UTC+11): Sydney is ahead,
    // the hands should advance, not retreat.
    setNow(Date.UTC(2020, 0, 1, 12, 0, 0, 0));
    const [zone, setZone] = createSignal('America/Los_Angeles');
    const screen = render(() => <ClockHands zone={zone()} />);

    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(120)',
    );

    setZone('Australia/Sydney');
    flush();

    setNow(Date.UTC(2020, 0, 1, 12, 0, 0, ANIMATION_DURATION)); // 04:00 in LA, 23:00 in Sydney
    flush();
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(330)',
    );
    screen.unmount();
  });

  test('does not animate the minute hand between whole-hour offset zones', () => {
    setNow(Date.UTC(2020, 0, 1, 12, 0, 0, 0)); // Belgrade = 13:00, Khandyga = 21:00
    flush();
    const [zone, setZone] = createSignal('Asia/Khandyga');
    const screen = render(() => <ClockHands zone={zone()} />);

    setZone('Europe/Belgrade');
    flush();

    setNow(Date.UTC(2020, 0, 1, 12, 0, 0, 600));
    flush();
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      0,
      0,
    );
    screen.unmount();
  });

  test('redirects a minute-hand animation mid-flight', () => {
    setNow(start);
    flush();
    const [zone, setZone] = createSignal('UTC');
    const screen = render(() => <ClockHands zone={zone()} />);

    // Start animating toward Asia/Kathmandu (UTC+5:45) — minute hand moves.
    setZone('Asia/Kathmandu');
    flush();

    // Mid-flight: minute hand is partway to 270°.
    setNow(start + mid);
    flush();
    expect(screen.getByTestId(clockMinuteId)).not.toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Redirect to Asia/Tokyo (UTC+9, on the hour) — minute hand moves back.
    setZone('Asia/Tokyo');
    flush();

    setNow(start + mid + ANIMATION_DURATION);
    flush();
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      0,
      0,
    );
    screen.unmount();
  });

  test('redirects the animation when the zone changes mid-animation', () => {
    setNow(start);
    flush();
    const [zone, setZone] = createSignal('UTC');
    const screen = render(() => <ClockHands zone={zone()} />);

    // Start animating toward Europe/Berlin (+1 hour).
    setZone('Europe/Berlin');
    flush();

    // Berlin is on the hour — the minute hand does not move.
    setNow(start + mid);
    flush();
    expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Redirect to Asia/Kathmandu (UTC+5:45) — minute hand moves.
    setZone('Asia/Kathmandu');
    flush();

    setNow(start + mid + ANIMATION_DURATION);
    flush();
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      270,
      0,
    );
    screen.unmount();
  });
});
