import { render, screen } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import { ClockFace } from '@/ClockFace';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    render(() => <ClockFace />);
    expect(screen.getByTestId('clock-face')).toBeInTheDocument();
  });
  test('unmount clock face', () => {
    const { unmount } = render(() => <ClockFace />);
    unmount();
  });
});
