import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      solid(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint . --max-warnings 0',
          useFlatConfig: true,
        },
      }),
    ],
  });
