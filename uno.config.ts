import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  rules: [
    [/^will-change-(.+)$/, ([, d]) => ({ 'will-change': d })],
  ]
});