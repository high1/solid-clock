import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-solid';

import { clockGraduationId, seconds } from '#src/common';
import { Graduations } from '#src/Graduations';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    render(() => <Graduations />);
    expect(
      document.querySelectorAll(`[data-testid^="${clockGraduationId}-"]`),
    ).toHaveLength(seconds);
  });
});
