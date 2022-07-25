import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/solid-clock/',
  plugins: [solid(), uno(), tsconfigPaths()],
  optimizeDeps: {
    disabled: false
  },
  build: {
    commonjsOptions: { include: [] }
  }
});
