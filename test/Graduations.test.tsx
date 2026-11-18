import { describe, expect, test } from 'vitest';

import { seconds } from '#src/common';
import { Graduations } from '#src/Graduations';
import { render } from '#src/testing/render';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    render(() => <Graduations />);
    expect(
      document.querySelectorAll(`[data-testid^="clock-graduation-"]`),
    ).toHaveLength(seconds);
  });
});
