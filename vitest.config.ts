import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        environment: 'happy-dom',
        setupFiles: 'test/vitest-setup.ts',
      },
      resolve: {
        conditions: ['development', 'browser'],
      },
    }),
  ),
);
