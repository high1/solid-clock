import { createSignal, onSettled } from 'solid-js';

import { Moon } from '#src/Moon';
import { Sun } from '#src/Sun';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = createSignal(false);
  const title = () => `Switch to ${isDark() ? 'light' : 'dark'} mode`;

  // Lazily created on first use (browser only — never during SSR).
  let mediaQuery: MediaQueryList | undefined;

  function getMediaQuery() {
    mediaQuery ??= window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery;
  }

  onSettled(() => {
    const mq = getMediaQuery();
    setIsDark(document.documentElement.classList.contains('dark'));

    const savedTheme = () => localStorage.getItem('theme');

    const currentSaved = savedTheme();
    if (currentSaved && (currentSaved === 'dark') === mq.matches)
      localStorage.removeItem('theme');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!savedTheme()) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
        document.documentElement.classList.toggle('light', !e.matches);
      }
    };

    mq.addEventListener('change', handleSystemThemeChange);

    return () => {
      mq.removeEventListener('change', handleSystemThemeChange);
    };
  });

  function toggleTheme() {
    const mq = getMediaQuery();
    const systemWantsDark = mq.matches;

    const next = !isDark();
    setIsDark(next);

    document.documentElement.classList.toggle('dark', next);
    document.documentElement.classList.toggle('light', !next);

    if (next === systemWantsDark) localStorage.removeItem('theme');
    else localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  const iconClass = (active: boolean, exitClass: string) =>
    active
      ? 'scale-100 rotate-0 opacity-100'
      : `scale-50 opacity-0 ${exitClass}`;

  return (
    <button
      aria-label={title()}
      class="group relative flex cursor-pointer items-center justify-center rounded-full border border-zinc-200 text-zinc-600 block-10 inline-10 hover:text-zinc-900 focus:outline-none dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
      onClick={toggleTheme}
      title={title()}
    >
      <div class="relative block-5 inline-5 group-hover:rotate-10 motion-safe:transition-transform">
        <div
          class={`absolute inset-0 block-5 inline-5 [&&]:motion-safe:transition-all ${iconClass(!isDark(), 'rotate-90')}`}
        >
          <Sun />
        </div>
        <div
          class={`absolute inset-0 block-5 inline-5 [&&]:motion-safe:transition-all ${iconClass(isDark(), '-rotate-90')}`}
        >
          <Moon />
        </div>
      </div>
    </button>
  );
};
