/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    solid(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint . --max-warnings 0',
        useFlatConfig: true,
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest-setup.ts',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
}));
