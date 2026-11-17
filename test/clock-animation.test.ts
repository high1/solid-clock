import { describe, expect, test } from 'vitest';

import { directionalDelta } from '#src/clock-animation';

describe('directionalDelta', () => {
  test.each([
    ['same value', 0.5, 0.5, true, 0],
    ['same value backward', 0.5, 0.5, false, 0],
    ['forward normal', 0.1, 0.3, true, 0.2],
    ['backward normal', 0.3, 0.1, false, -0.2],
    ['forward across zero', 0.958, 0, true, 0.042],
    ['backward across zero', 0, 0.958, false, -0.042],
    ['backward across zero small', 0.1, 0.958, false, -0.142],
    ['large forward', 0.1, 0.9, true, 0.8],
    ['large backward', 0.9, 0.1, false, -0.8],
    ['forward exactly half turn', 0, 0.5, true, 0.5],
    ['backward exactly half turn', 0.5, 0, false, -0.5],
  ])('%s', (_name, from, to, forward, expected) => {
    expect(directionalDelta(from, to, forward)).toBeCloseTo(expected, 5);
  });
});
