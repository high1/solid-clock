import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-solid';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { getTimeZone, setNow } from '#src/time';

// `now` is a module-level singleton, so every test starts from a known clock
// rather than inheriting whatever the previous test left behind.
const setLocalTime = (hours = 0, minutes = 0, seconds = 0) => {
  vi.setSystemTime(new Date(2020, 0, 1, hours, minutes, seconds, 0));
  setNow(Date.now());
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
    const screen = render(() => <ClockHands zone="UTC" />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  test('renders second 15 in UTC', () => {
    setNow(Date.UTC(2020, 0, 1, 0, 0, 15, 0));
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
