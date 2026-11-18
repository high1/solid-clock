import solid from '@solidjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, transformWithOxc } from 'vite';
import { checker } from 'vite-plugin-checker';

const themeSrc = 'theme.ts';
const themeInit = 'theme-init';

export default defineConfig(({ mode }) => ({
  base: process.env['BASE'] ?? '',
  plugins: [
    tailwindcss(),
    solid(),
    {
      name: themeInit,
      async transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              attrs: {
                id: themeInit,
              },
              children: (
                await transformWithOxc(
                  fs.readFileSync(
                    path.resolve(import.meta.dirname, 'src', themeSrc),
                    'utf-8',
                  ),
                  themeSrc,
                )
              ).code,
              injectTo: 'head-prepend',
              tag: 'script',
            },
          ],
        };
      },
    },
    !(mode === 'test' || process.env['CI'])
    && checker({
      eslint: { lintCommand: 'eslint . --max-warnings 0' },
      typescript: true,
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
}));
