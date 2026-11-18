import { afterEach, describe, expect, test } from 'vitest';

import { cleanup, render } from '#src/testing/render';
import { ThemeToggle } from '#src/ThemeToggle';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function mockMediaQuery(initialMatches = false) {
  const listeners = new Map<string, (e: MediaQueryListEvent) => void>();
  const original = window.matchMedia.bind(window);

  const mediaQueryList = {
    addEventListener: (
      _type: string,
      cb: EventListenerOrEventListenerObject,
    ) => {
      const listener = typeof cb === 'function' ? cb : undefined;
      if (listener) listeners.set(MEDIA_QUERY, listener);
    },
    addListener: () => undefined,
    dispatchEvent: () => false,
    matches: initialMatches,
    media: MEDIA_QUERY,
    onchange: null,
    removeEventListener: () => undefined,
    removeListener: () => undefined,
  };

  window.matchMedia = () => mediaQueryList;

  return {
    fire: (matches: boolean) =>
      listeners.get(MEDIA_QUERY)?.(
        new MediaQueryListEvent('change', { matches }),
      ),
    restore: () => {
      window.matchMedia = original;
    },
  };
}

describe('<ThemeToggle />', () => {
  afterEach(() => {
    cleanup();
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark', 'light');
  });

  test('toggles the theme class on the document element', async () => {
    const screen = render(() => <ThemeToggle />);
    const initialHasDark = document.documentElement.classList.contains('dark');
    const initialHasLight
      = document.documentElement.classList.contains('light');

    await screen.getByRole('button').click();

    expect(document.documentElement.classList.contains('dark')).toBe(
      !initialHasDark,
    );
    expect(document.documentElement.classList.contains('light')).toBe(
      !initialHasLight,
    );
  });

  test('updates the theme when the system preference changes', () => {
    const { fire, restore } = mockMediaQuery();

    try {
      render(() => <ThemeToggle />);

      fire(true);

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    }
    finally {
      restore();
    }
  });

  test('does not update the theme when a saved override exists', () => {
    localStorage.setItem('theme', 'dark');
    const { fire, restore } = mockMediaQuery();

    try {
      render(() => <ThemeToggle />);

      fire(true);

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    }
    finally {
      restore();
    }
  });

  test('removes the saved theme on load when it matches the system preference', () => {
    const systemWantsDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    localStorage.setItem('theme', systemWantsDark ? 'dark' : 'light');

    render(() => <ThemeToggle />);

    expect(localStorage.getItem('theme')).toBeNull();
  });

  test('writes or clears the saved theme override based on the system preference', async () => {
    localStorage.removeItem('theme');
    const systemWantsDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const screen = render(() => <ThemeToggle />);

    await screen.getByRole('button').click();

    const nextIsDark = document.documentElement.classList.contains('dark');
    const savedTheme = localStorage.getItem('theme');

    expect(savedTheme).toBe(
      nextIsDark === systemWantsDark ? null : nextIsDark ? 'dark' : 'light',
    );
  });

  test('removes the saved theme when toggling back to the system preference', async () => {
    localStorage.removeItem('theme');
    const screen = render(() => <ThemeToggle />);

    await screen.getByRole('button').click();
    expect(localStorage.getItem('theme')).not.toBeNull();

    await screen.getByRole('button').click();
    expect(localStorage.getItem('theme')).toBeNull();
  });

  test('keeps a saved theme override that differs from the system preference', () => {
    const systemWantsDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    localStorage.setItem('theme', systemWantsDark ? 'light' : 'dark');

    render(() => <ThemeToggle />);

    expect(localStorage.getItem('theme')).toBe(
      systemWantsDark ? 'light' : 'dark',
    );
  });

  test('writes a theme override when the toggled theme differs from the system preference', async () => {
    localStorage.removeItem('theme');
    const screen = render(() => <ThemeToggle />);

    await screen.getByRole('button').click();

    expect(localStorage.getItem('theme')).not.toBeNull();
  });

  test('writes a light override when toggling to a light theme while the system prefers dark', async () => {
    const { restore } = mockMediaQuery(true);

    try {
      const screen = render(() => <ThemeToggle />);

      await screen.getByRole('button').click();
      await screen.getByRole('button').click();

      expect(localStorage.getItem('theme')).toBe('light');
    }
    finally {
      restore();
    }
  });
});
