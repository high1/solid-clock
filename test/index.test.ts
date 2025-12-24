import { describe, expect, test, vi } from 'vitest';
import { render } from 'solid-js/web';

describe('index', () => {
  test('renders without crashing', async () => {
    vi.mock('solid-js/web', { spy: true });
    await import('@/index');
    expect(render).toHaveBeenCalledWith(expect.any(Function), document.body);
  });
});
