import { describe, expect, test, vi } from 'vitest';

import { ClockFace } from '#src/ClockFace';
import { clockFaceId } from '#src/common';
import { render } from '#src/testing/render';

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

describe('<ClockFace /> zone selection', () => {
  test('updates the displayed zone when a new zone is selected', async () => {
    const screen = render(() => <ClockFace />);

    const initialZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const selectedZone
      = initialZone === 'Pacific/Auckland' ? 'UTC' : 'Pacific/Auckland';
    const expectedLabel
      = selectedZone === 'Pacific/Auckland' ? 'Auckland' : 'UTC';

    const trigger = document.getElementById('clock-timezone');
    trigger?.click();

    await screen.getByText(expectedLabel).click();

    expect(trigger?.textContent ?? '').toContain(expectedLabel);
    screen.unmount();
  });
});
