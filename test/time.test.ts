import { describe, expect, test } from 'vitest';

import { getSecondsSinceMidnight } from '#src/time';

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

  test('defaults to now', () => {
    const before = getSecondsSinceMidnight();
    const after = getSecondsSinceMidnight();

    expect(after).toBeGreaterThanOrEqual(before);
    expect(after).toBeLessThan(86_400);
  });

  // These dates are local wall-clock times, so they only land on a DST
  // boundary because the browser runs in a DST-observing timezone. Measuring
  // elapsed real time instead of wall-clock time puts these an hour out.
  describe('across daylight saving transitions', () => {
    test.each([
      ['spring forward (23-hour day)', new Date(2020, 2, 8, 12, 0, 0, 0)],
      ['fall back (25-hour day)', new Date(2020, 10, 1, 12, 0, 0, 0)],
    ])('%s', (_name, date) => {
      expect(getSecondsSinceMidnight(date)).toBe(12 * 3600);
    });
  });
});
