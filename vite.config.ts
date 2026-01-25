/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    tailwindcss(),
    solid({ hot: mode === 'development' }),
    checker({
      eslint: {
        lintCommand: 'eslint . --max-warnings 0',
        useFlatConfig: true,
      },
      typescript: true,
    }),
  ],
  resolve: {
    conditions: ['development', 'browser'],
    tsconfigPaths: true,
  },
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    coverage: {
      exclude: ['./src/index.css'],
    },
    environment: 'happy-dom',
  },
}));
