/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    ...(mode === 'test' ? [tsconfigPaths({ projectDiscovery: 'lazy' })] : []),
    tailwindcss(),
    solid(),
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
    environment: 'happy-dom',
  },
}));
