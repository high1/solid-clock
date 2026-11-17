const savedTheme = localStorage.getItem('theme');
const systemWantsDark = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;
const isDark = savedTheme ? savedTheme === 'dark' : systemWantsDark;

document.documentElement.classList.toggle('dark', isDark);
document.documentElement.classList.toggle('light', !isDark);
