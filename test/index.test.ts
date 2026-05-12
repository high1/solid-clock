import { render } from 'solid-js/web';
import { describe, expect, test, vi } from 'vitest';

vi.mock('solid-js/web', { spy: true });

describe('index', () => {
  test('renders without crashing', async () => {
    await import('#src/index');
    expect(render).toHaveBeenCalledWith(expect.any(Function), document.body);
  });
});
