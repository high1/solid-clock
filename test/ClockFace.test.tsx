import { describe, expect, test } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { ClockFace } from '@/ClockFace';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    render(() => <ClockFace />);
    expect(screen.getByTestId('clock-face'));
  });
  test('unmount clock face', () => {
    const { unmount } = render(() => <ClockFace />);
    unmount();
  });
});
