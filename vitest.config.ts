import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        alias: { '@/': new URL('./src/', import.meta.url).pathname },
        browser: {
          enabled: true,
          headless: true,
          instances: [{ browser: 'chromium' }],
          provider: playwright(),
          screenshotFailures: false,
        },
        coverage: {
          exclude: ['./src/index.css'],
        },
        environment: 'happy-dom',
      },
    }),
  ),
);
