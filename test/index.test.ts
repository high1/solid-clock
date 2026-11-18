import { render } from '@solidjs/web';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@solidjs/web', { spy: true });

describe('index', () => {
  test('renders without crashing', async () => {
    await import('#src/index');
    expect(render).toHaveBeenCalledWith(expect.any(Function), document.body);
  });
});
