import { afterEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-solid';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';

describe('<ClockHands />', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test.each([
    [0, 'rotate(0.0)'],
    [6, 'rotate(180.0)'],
    [9, 'rotate(270.0)'],
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
  });

  test.each([
    [0, 'rotate(0.0)'],
    [30, 'rotate(180.0)'],
    [59, 'rotate(354.0)'],
  ])('renders minute %i as %s', (minutes, transform) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, 0, minutes, 0, 0));
    const screen = render(() => <ClockHands />);
    expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  test.each([
    [0, 'rotate(0.0)'],
    [30, 'rotate(180.0)'],
    [59, 'rotate(354.0)'],
  ])('renders second %i as %s', (seconds, transform) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, 0, 0, seconds, 0));
    const screen = render(() => <ClockHands />);
    expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });
});
