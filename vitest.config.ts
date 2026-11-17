import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from '#/vite.config';

export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        browser: {
          enabled: true,
          headless: true,
          instances: [{ browser: 'chromium' }],
          provider: playwright(),
          screenshotFailures: false,
        },
        coverage: {
          exclude: ['src/index.css'],
          thresholds: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
          },
        },
        environment: 'node',
      },
    }),
  ),
);
