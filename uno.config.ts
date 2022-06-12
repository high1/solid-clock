import { defineConfig } from 'unocss';

export default defineConfig({
  rules: [[/^change-(.+)$/, ([, d]) => ({ 'will-change': d })]],
});
