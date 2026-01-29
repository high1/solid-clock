import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-solid';

import { ClockFace } from '@/ClockFace';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(() => <ClockFace />);
    expect(screen.getByTestId('clock-face')).toBeInTheDocument();
  });
  test('unmount clock face', () => {
    const { unmount } = render(() => <ClockFace />);
    unmount();
  });
});
