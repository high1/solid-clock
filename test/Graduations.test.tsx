import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-solid';

import { seconds } from '#src/common';
import { Graduations } from '#src/Graduations';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    render(() => <Graduations />);
    expect(
      document.querySelectorAll(`[data-testid^="clock-graduation-"]`),
    ).toHaveLength(seconds);
  });
});
