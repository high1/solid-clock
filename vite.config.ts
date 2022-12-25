import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
    plugins: [solid(), uno(), tsconfigPaths()],
  });
