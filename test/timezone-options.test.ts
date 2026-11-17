import { describe, expect, test } from 'vitest';

import {
  filterTimeZones,
  getTimezoneGroups,
  normalize,
  zoneLabel,
  zoneRegion,
} from '#src/timezone-options';

describe('normalize', () => {
  test('lowercases and replaces underscores with spaces', () => {
    expect(normalize('America/New_York')).toBe('america/new york');
  });
});

describe('zoneRegion', () => {
  test('returns the text before the first slash', () => {
    expect(zoneRegion('Europe/Berlin')).toBe('Europe');
  });

  test('returns Other for zones without a slash', () => {
    expect(zoneRegion('UTC')).toBe('Other');
  });
});

describe('zoneLabel', () => {
  test('returns the last segment with underscores as spaces', () => {
    expect(zoneLabel('America/New_York')).toBe('New York');
  });

  test('returns the whole zone when there is no slash', () => {
    expect(zoneLabel('UTC')).toBe('UTC');
  });
});

describe('getTimezoneGroups', () => {
  const zones = ['Africa/Abidjan', 'America/New_York', 'Europe/Berlin', 'UTC'];

  test('returns every zone when the query is empty', () => {
    const groups = getTimezoneGroups(zones, '');
    const flat = groups.flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(zones);
  });

  test('filters case-insensitively and matches underscores as spaces', () => {
    const groups = getTimezoneGroups(zones, 'new york');
    const flat = groups.flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['America/New_York']);
  });

  test('groups by region and assigns contiguous indices', () => {
    const groups = getTimezoneGroups(zones, '');
    expect(groups.map((group) => group.region)).toEqual([
      'Africa',
      'America',
      'Europe',
      'Other',
    ]);
    expect(groups.flatMap((g) => g.items.map((i) => i.index))).toEqual([
      0, 1, 2, 3,
    ]);
  });

  test('returns no groups when nothing matches', () => {
    expect(getTimezoneGroups(zones, 'zzzzz')).toEqual([]);
  });

  test('does not mutate the input', () => {
    const input = [...zones];
    getTimezoneGroups(input, 'europe');
    expect(input).toEqual(zones);
  });
});

describe('getTimezoneGroups region-aware search', () => {
  const zones = [
    'Africa/Abidjan',
    'America/New_York',
    'Asia/Kolkata',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Europe/Berlin',
    'UTC',
  ];

  test('a single character does not trigger region interpretation', () => {
    const flat = getTimezoneGroups(zones, 'a').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toContain('Asia/Tokyo');
    expect(flat).toContain('America/New_York');
    expect(flat.length).toBeGreaterThan(2);
  });

  test('au narrows to the Australia region', () => {
    const flat = getTimezoneGroups(zones, 'au').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['Australia/Sydney']);
  });

  test('amer tok restricts to America and finds no match', () => {
    const flat = getTimezoneGroups(zones, 'amer tok').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual([]);
  });

  test('new york matches America/New_York', () => {
    const flat = getTimezoneGroups(zones, 'new york').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['America/New_York']);
  });

  test('asia matches every Asian timezone', () => {
    const flat = getTimezoneGroups(zones, 'asia').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['Asia/Kolkata', 'Asia/Tokyo']);
  });

  test('asia tok narrows Asian timezones by label', () => {
    const flat = getTimezoneGroups(zones, 'asia tok').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['Asia/Tokyo']);
  });

  test('tok matches any timezone whose id contains tok', () => {
    const flat = getTimezoneGroups(zones, 'tok').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['Asia/Tokyo']);
  });

  test('tokyo matches Asia/Tokyo', () => {
    const flat = getTimezoneGroups(zones, 'tokyo').flatMap((group) =>
      group.items.map((item) => item.zone),
    );
    expect(flat).toEqual(['Asia/Tokyo']);
  });
});

describe('getTimezoneGroups index assignment', () => {
  test('keeps indices aligned with rendered order for unsorted input', () => {
    const groups = getTimezoneGroups(
      ['Europe/Berlin', 'Africa/Abidjan', 'Europe/London'],
      '',
    );

    expect(groups.map((group) => group.region)).toEqual(['Europe', 'Africa']);
    expect(
      groups.flatMap((group) => group.items.map((item) => item.zone)),
    ).toEqual(['Europe/Berlin', 'Europe/London', 'Africa/Abidjan']);
    expect(
      groups.flatMap((group) => group.items.map((item) => item.index)),
    ).toEqual([0, 1, 2]);
  });
});

describe('filterTimeZones', () => {
  test('keeps UTC and removes Etc/GMT entries', () => {
    const input = ['Africa/Abidjan', 'Etc/GMT+5', 'Europe/Berlin'];
    expect(filterTimeZones(input)).toEqual([
      'UTC',
      'Africa/Abidjan',
      'Europe/Berlin',
    ]);
  });

  test('deduplicates UTC when already present', () => {
    const input = ['UTC', 'Europe/Berlin'];
    expect(filterTimeZones(input)).toEqual(['UTC', 'Europe/Berlin']);
  });

  test('keeps all entries when none are Etc/GMT', () => {
    const input = ['Africa/Abidjan', 'Europe/Berlin'];
    expect(filterTimeZones(input)).toEqual([
      'UTC',
      'Africa/Abidjan',
      'Europe/Berlin',
    ]);
  });
});
