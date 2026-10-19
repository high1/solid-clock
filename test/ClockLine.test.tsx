import { afterEach, describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-solid';

import { ClockLine, type ClockLineProps } from '#src/ClockLine';

describe('<ClockLine />', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('rest props do not override computed y1/y2', () => {
    const props = {
      graduation: true,
      length: 80,
      limit: 10,
      y1: 999,
      y2: -999,
    } as unknown as ClockLineProps;
    render(() => <ClockLine {...props} />);
    const line = document.querySelector('line');
    expect(line).not.toBeNull();
    // Computed y1 = length - limit = 70, not the rest value 999
    expect(line?.getAttribute('y1')).toBe('70');
    // Computed y2 = -limit = -10, not the rest value -999
    expect(line?.getAttribute('y2')).toBe('-10');
  });

  test('graduation line uses length - limit for y1 and -limit for y2', () => {
    render(() => <ClockLine graduation length={6} limit={10} />);
    const line = document.querySelector('line');
    expect(line).not.toBeNull();
    expect(line?.getAttribute('y1')).toBe('-4'); // 6 - 10
    expect(line?.getAttribute('y2')).toBe('-10'); // -limit
  });

  test('regular line sets y1 to false and y2 to -length', () => {
    render(() => <ClockLine length={80} />);
    const line = document.querySelector('line');
    expect(line).not.toBeNull();
    expect(line?.getAttribute('y1')).toBe('false');
    expect(line?.getAttribute('y2')).toBe('-80');
  });
});
