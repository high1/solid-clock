import { defineConfig, presetUno } from 'unocss';

const { theme } = presetUno();
export default defineConfig({
  theme: {
    colors: {
      gray: theme?.colors?.['zinc'] ?? {},
      solid: '#518ac8',
    },
  },
});
