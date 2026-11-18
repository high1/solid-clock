import { describe, expect, test } from 'vitest';

import {
  hourFraction,
  minuteFraction,
  rotate,
  secondFraction,
  subsecondFraction,
} from '#src/common';
import {
  getSecondsSinceMidnight,
  getSecondsSinceMidnightIn,
  getTimeZone,
  getTimezoneOffset,
  getTimeZones,
} from '#src/time';

describe('getSecondsSinceMidnight', () => {
  test('runs in the requested timezone', () => {
    const expected = import.meta.env.VITE_TZ;
    if (expected)
      expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(expected);
  });

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

  describe('across daylight saving transitions', () => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const transitions: Record<string, { autumn: number; spring: number }> = {
      'America/New_York': {
        autumn: Date.UTC(2020, 10, 1, 6),
        spring: Date.UTC(2020, 2, 8, 7),
      },
      'Australia/Sydney': {
        autumn: Date.UTC(2020, 3, 4, 16),
        spring: Date.UTC(2020, 9, 3, 16),
      },
      'Europe/Belgrade': {
        autumn: Date.UTC(2020, 9, 25, 1),
        spring: Date.UTC(2020, 2, 29, 1),
      },
      'Europe/Berlin': {
        autumn: Date.UTC(2020, 9, 25, 1),
        spring: Date.UTC(2020, 2, 29, 1),
      },
    };

    const transition = transitions[zone];

    test.skipIf(!transition)('spring forward skips an hour', () => {
      if (!transition) return;

      expect(getSecondsSinceMidnight(new Date(transition.spring - 1000))).toBe(
        7199,
      );
      expect(getSecondsSinceMidnight(new Date(transition.spring))).toBe(10800);
    });

    test.skipIf(!transition)('fall back repeats an hour', () => {
      if (!transition) return;

      const before = zone === 'America/New_York' ? 7199 : 10799;
      const after = zone === 'America/New_York' ? 3600 : 7200;

      expect(getSecondsSinceMidnight(new Date(transition.autumn - 1000))).toBe(
        before,
      );
      expect(getSecondsSinceMidnight(new Date(transition.autumn))).toBe(after);
    });
  });
});

describe('rotation', () => {
  test.each([
    ['midnight', 0, 'rotate(0)', 'rotate(0)', 'rotate(0)', 'rotate(0)'],
    ['one hour', 3_600, 'rotate(0)', 'rotate(0)', 'rotate(0)', 'rotate(30)'],
    [
      'half past noon',
      43_200 + 1_800,
      'rotate(0)',
      'rotate(0)',
      'rotate(180)',
      'rotate(15)',
    ],
    [
      '59.5 seconds',
      59.5,
      'rotate(180)',
      'rotate(357)',
      'rotate(5.9)',
      'rotate(0.5)',
    ],
    [
      'next midnight',
      86_400,
      'rotate(0)',
      'rotate(0)',
      'rotate(0)',
      'rotate(0)',
    ],
  ])('%s', (_name, clock, subsecond, second, minute, hour) => {
    expect(rotate(hourFraction(clock), 1)).toEqual(hour);
    expect(rotate(minuteFraction(clock), 1)).toEqual(minute);
    expect(rotate(secondFraction(clock), 1)).toEqual(second);
    expect(rotate(subsecondFraction(clock), 0)).toEqual(subsecond);
  });
});

describe('rotation primitives', () => {
  test.each([
    ['midnight', 0, 0, 0, 0, 0],
    ['one hour', 3_600, 1 / 12, 0, 0, 0],
    ['half past noon', 43_200 + 1_800, 0.5 / 12, 0.5, 0, 0],
    ['59.5 seconds', 59.5, 59.5 / 3600 / 12, 59.5 / 60 / 60, 59.5 / 60, 0.5],
    ['next midnight', 86_400, 0, 0, 0, 0],
  ])('%s', (_name, clock, hour, minute, second, subsecond) => {
    expect(hourFraction(clock)).toBeCloseTo(hour, 5);
    expect(minuteFraction(clock)).toBeCloseTo(minute, 5);
    expect(secondFraction(clock)).toBeCloseTo(second, 5);
    expect(subsecondFraction(clock)).toBeCloseTo(subsecond, 5);
  });
});

describe('getSecondsSinceMidnightIn', () => {
  test.each([
    ['midnight', Date.UTC(2020, 0, 1, 0, 0, 0, 0), 0],
    ['one second past midnight', Date.UTC(2020, 0, 1, 0, 0, 1, 0), 1],
    ['one minute past midnight', Date.UTC(2020, 0, 1, 0, 1, 0, 0), 60],
    ['noon', Date.UTC(2020, 0, 1, 12, 0, 0, 0), 43_200],
    ['last second of the day', Date.UTC(2020, 0, 1, 23, 59, 59, 0), 86_399],
  ])('%s in UTC', (_name, timestamp, expected) => {
    expect(getSecondsSinceMidnightIn(timestamp, 'UTC')).toBe(expected);
  });

  test('renders the same instant in different zones', () => {
    const timestamp = Date.UTC(2020, 2, 8, 16, 30, 0, 0);

    expect(getSecondsSinceMidnightIn(timestamp, 'UTC')).toBe(16 * 3600 + 1800);
    expect(getSecondsSinceMidnightIn(timestamp, 'Europe/Berlin')).toBe(
      17 * 3600 + 1800,
    );
    expect(getSecondsSinceMidnightIn(timestamp, 'America/New_York')).toBe(
      12 * 3600 + 1800,
    );
    expect(getSecondsSinceMidnightIn(timestamp, 'Australia/Sydney')).toBe(
      3 * 3600 + 1800,
    );
  });

  test('converts timestamps to Berlin wall-clock time', () => {
    const spring = Date.UTC(2020, 2, 8, 11, 0, 0, 0);
    const autumn = Date.UTC(2020, 10, 1, 11, 0, 0, 0);

    expect(getSecondsSinceMidnightIn(spring, 'Europe/Berlin')).toBe(12 * 3600);
    expect(getSecondsSinceMidnightIn(autumn, 'Europe/Berlin')).toBe(12 * 3600);
  });

  test('spring forward skips from 01:59:59 to 03:00:00', () => {
    const before = Date.UTC(2020, 2, 29, 0, 59, 59);
    const after = Date.UTC(2020, 2, 29, 1, 0, 0);

    expect(getSecondsSinceMidnightIn(before, 'Europe/Berlin')).toBe(7199);
    expect(getSecondsSinceMidnightIn(after, 'Europe/Berlin')).toBe(10800);
  });

  test('fall back repeats the 02:00 hour', () => {
    const before = Date.UTC(2020, 9, 25, 0, 59, 59);
    const after = Date.UTC(2020, 9, 25, 1, 0, 0);

    expect(getSecondsSinceMidnightIn(before, 'Europe/Berlin')).toBe(10799);
    expect(getSecondsSinceMidnightIn(after, 'Europe/Berlin')).toBe(7200);
  });
});

describe('getTimezoneOffset', () => {
  const winter = Date.UTC(2020, 0, 15, 12, 0, 0, 0);
  const summer = Date.UTC(2020, 6, 15, 12, 0, 0, 0);

  test.each([
    ['UTC', 'UTC', winter, 0],
    ['Europe/Berlin (winter)', 'Europe/Berlin', winter, 3600],
    ['Europe/Berlin (summer)', 'Europe/Berlin', summer, 7200],
    ['America/New_York (winter)', 'America/New_York', winter, -18_000],
    ['America/New_York (summer)', 'America/New_York', summer, -14_400],
    ['Australia/Sydney (summer)', 'Australia/Sydney', winter, 39_600],
    ['Australia/Sydney (winter)', 'Australia/Sydney', summer, 36_000],
    ['Asia/Kolkata', 'Asia/Kolkata', winter, 19_800],
    ['Asia/Kathmandu', 'Asia/Kathmandu', winter, 20_700],
  ])('%s', (_name, zone, timestamp, expected) => {
    expect(getTimezoneOffset(timestamp, zone)).toBe(expected);
  });

  test('accounts for millisecond precision', () => {
    const timestamp = Date.UTC(2020, 0, 15, 12, 0, 0, 500);

    expect(getTimezoneOffset(timestamp, 'Europe/Berlin')).toBe(3600);
    expect(getTimezoneOffset(timestamp, 'America/New_York')).toBe(-18000);
  });
});

describe('timeZones', () => {
  test('starts with UTC', () => {
    expect(getTimeZones()[0]).toBe('UTC');
  });

  test('contains no Etc/GMT entries', () => {
    expect(getTimeZones().some(zone => zone.startsWith('Etc/GMT'))).toBe(
      false,
    );
  });

  test('retains the source order of the geographical entries', () => {
    const source = Intl.supportedValuesOf('timeZone').filter(
      zone => !zone.startsWith('Etc/GMT'),
    );
    expect(getTimeZones().slice(1)).toEqual(source);
  });
});

describe('getTimeZone', () => {
  test('returns the runtime timezone as a string', () => {
    expect(typeof getTimeZone()).toBe('string');
    expect(getTimeZone().length).toBeGreaterThan(0);
  });
});
