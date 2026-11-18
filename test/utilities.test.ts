import { afterEach, describe, expect, test, vi } from 'vitest';

import { cn, getTestId } from '#src/utilities';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getTestId', () => {
  test('returns undefined outside test builds', () => {
    vi.stubEnv('MODE', 'development');

    expect(getTestId('test')).toBeUndefined();
  });

  // Production is the mode that matters: this is where the attribute must not
  // reach the DOM at all.
  test('returns undefined in production builds', () => {
    vi.stubEnv('MODE', 'production');

    expect(getTestId('test')).toBeUndefined();
  });

  test('returns the id in test builds', () => {
    vi.stubEnv('MODE', 'test');

    expect(getTestId('test')).toBe('test');
  });
});

describe('cn', () => {
  test('joins truthy classes with a single space', () => {
    expect(cn('relative', 'block', 'flex')).toBe('relative block flex');
  });

  test('omits falsy classes', () => {
    expect(cn('relative', undefined, 'block')).toBe('relative block');
    expect(cn('relative', '', false, 'block')).toBe('relative block');
    expect(cn('relative', null, 'flex')).toBe('relative flex');
  });

  test('returns an empty string when passed nothing', () => {
    expect(cn()).toBe('');
  });
});
