import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    tailwindcss(),
    solid({ hot: mode === 'development' }),
    {
      ...checker({
        ...(process.env['CI']
          ? {}
          : { eslint: { lintCommand: 'eslint . --max-warnings 0' } }),
        typescript: true,
      }),
      apply: () => mode !== 'test',
    },
  ],
  resolve: {
    tsconfigPaths: true,
  },
}));
