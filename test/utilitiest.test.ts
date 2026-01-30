import { afterAll, describe, expect, test, vi } from 'vitest';

import { getTestId } from '@/utilities';

afterAll(() => void vi.unstubAllEnvs());

describe('utilities', () => {
  test('testid should be undefined in development mode', () => {
    vi.stubEnv('MODE', 'development');
    expect(getTestId('test')).toBeUndefined();
  });

  test('testid should be defined in test mode', () => {
    const test = 'test';
    vi.stubEnv('MODE', test);
    expect(getTestId(test)).toEqual(test);
  });
});
