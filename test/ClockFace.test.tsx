import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-solid';

import { ClockFace } from '#src/ClockFace';
import { clockFaceId } from '#src/common';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(() => <ClockFace />);
    expect(screen.getByTestId(clockFaceId)).toBeInTheDocument();
    screen.unmount();
  });
  test('unmounts clock face', () => {
    const screen = render(() => <ClockFace />);
    screen.unmount();
    expect(screen.getByTestId(clockFaceId)).not.toBeInTheDocument();
  });
  test('cancels the animation frame on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const screen = render(() => <ClockFace />);
    screen.unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });
});
