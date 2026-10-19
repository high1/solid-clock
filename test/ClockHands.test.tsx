import { afterEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-solid';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';

describe('<ClockHands />', () => {
  afterEach(() => {
    void vi.useRealTimers();
  });

  test.each([
    [0, 'rotate(0.0)'],
    [1, 'rotate(30.0)'],
    [3, 'rotate(90.0)'],
    [6, 'rotate(180.0)'],
    [11, 'rotate(330.0)'],
    [12, 'rotate(0.0)'],
  ])('renders hour %i as %s', (hours, transform) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, hours, 0, 0, 0));
    const screen = render(() => <ClockHands />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
    vi.useRealTimers();
  });

  const minuteSecondCases = [
    [0, 'rotate(0.0)'],
    [1, 'rotate(6.0)'],
    [15, 'rotate(90.0)'],
    [30, 'rotate(180.0)'],
    [59, 'rotate(354.0)'],
  ] as const;

  test.each(minuteSecondCases)(
    'renders minute %i as %s',
    (minutes, transform) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2020, 0, 1, 0, minutes, 0, 0));
      const screen = render(() => <ClockHands />);
      expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
      vi.useRealTimers();
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i as %s',
    (seconds, transform) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2020, 0, 1, 0, 0, seconds, 0));
      const screen = render(() => <ClockHands />);
      expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
      vi.useRealTimers();
    },
  );
});
