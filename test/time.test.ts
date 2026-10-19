import { afterEach, describe, expect, test, vi } from 'vitest';

import {
  getSecondsSinceMidnight,
  hourTransform,
  minuteTransform,
  secondTransform,
  subsecondTransform,
} from '#src/time';

afterEach(() => {
  vi.useRealTimers();
});

describe('getSecondsSinceMidnight', () => {
  test.each([
    ['midnight', new Date(2020, 0, 1, 0, 0, 0, 0), 0],
    ['one second past midnight', new Date(2020, 0, 1, 0, 0, 1, 0), 1],
    ['one minute past midnight', new Date(2020, 0, 1, 0, 1, 0, 0), 60],
    ['noon', new Date(2020, 0, 1, 12, 0, 0, 0), 43_200],
    ['last second of the day', new Date(2020, 0, 1, 23, 59, 59, 0), 86_399],
    ['sub-second precision', new Date(2020, 0, 1, 1, 2, 3, 500), 3723.5],
  ])('%s', (_name, date, expected) => {
    expect(getSecondsSinceMidnight(date)).toBe(expected);
  });

  test('does not mutate the supplied date', () => {
    const date = new Date(2020, 0, 1, 12, 0, 0, 0);
    const before = date.getTime();

    getSecondsSinceMidnight(date);

    expect(date.getTime()).toBe(before);
  });

  // Comparing two live readings would flake across midnight, so pin the clock
  // and assert the exact value instead.
  test('defaults to now', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, 12, 0, 0, 0));

    expect(getSecondsSinceMidnight()).toBe(43_200);
  });

  // A DST transition day is one where the UTC offset at local midnight differs
  // from the offset at local noon: the clocks moved in between. Noon on such a
  // day is 12:00 wall-clock no matter how much real time elapsed since local
  // midnight, so measuring elapsed time instead puts it an hour out.
  const transitionNoons = (year: number) => {
    const found: { kind: 'fall back' | 'spring forward'; noon: Date }[] = [];
    for (let day = 0; day < 366; day++) {
      const midnight = new Date(year, 0, 1 + day, 0, 0, 0);
      if (midnight.getFullYear() !== year) break;
      const noon = new Date(year, midnight.getMonth(), midnight.getDate(), 12);
      const change = midnight.getTimezoneOffset() - noon.getTimezoneOffset();
      if (change !== 0)
        found.push({ kind: change > 0 ? 'spring forward' : 'fall back', noon });
    }
    return found;
  };

  describe('across daylight saving transitions', () => {
    const transitions = transitionNoons(2020);

    // Skips rather than passes vacuously when the timezone has no DST. CI runs
    // this suite across several zones so the skip is never what actually runs.
    test.skipIf(transitions.length === 0)(
      'noon stays at 12:00 wall-clock on every transition day',
      () => {
        for (const { kind, noon } of transitions)
          expect(getSecondsSinceMidnight(noon), kind).toBe(12 * 3600);
      },
    );
  });
});

describe('hourTransform', () => {
  test.each([
    [0, 'rotate(0.0)'],
    [21_600, 'rotate(180.0)'], // 6:00
    [32_400, 'rotate(270.0)'], // 9:00
    [43_200, 'rotate(0.0)'], // 12:00
    [45_900, 'rotate(22.5)'], // 12:45 → 12.75h → 0.0625 → 22.5°
  ])('%s seconds since midnight → %s', (seconds, expected) => {
    expect(hourTransform(seconds)).toBe(expected);
  });
});

describe('minuteTransform', () => {
  test.each([
    [0, 'rotate(0.0)'],
    [1_800, 'rotate(180.0)'], // 30 minutes
    [3_600, 'rotate(0.0)'], // 60 minutes
  ])('%s seconds since midnight → %s', (seconds, expected) => {
    expect(minuteTransform(seconds)).toBe(expected);
  });
});

describe('secondTransform', () => {
  test.each([
    [0, 'rotate(0.0)'],
    [30, 'rotate(180.0)'],
    [59, 'rotate(354.0)'],
  ])('%s seconds since midnight → %s', (seconds, expected) => {
    expect(secondTransform(seconds)).toBe(expected);
  });
});

describe('subsecondTransform', () => {
  test.each([
    [0, 'rotate(0)'],
    [0.5, 'rotate(180)'],
    [0.999, 'rotate(360)'],
  ])('%s seconds since midnight → %s', (seconds, expected) => {
    expect(subsecondTransform(seconds)).toBe(expected);
  });
});
