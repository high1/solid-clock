import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs as tseslintConfigs } from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import solidTsConfig from 'eslint-plugin-solid/configs/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import jsonc from 'eslint-plugin-jsonc';
import yml from 'eslint-plugin-yml';
import { importX } from 'eslint-plugin-import-x';
import stylistic from '@stylistic/eslint-plugin';
import html from '@html-eslint/eslint-plugin';
import { fileURLToPath } from 'node:url';

export default defineConfig(
  eslint.configs.recommended,
  tseslintConfigs.strictTypeChecked,
  tseslintConfigs.stylisticTypeChecked,
  jsxA11y.flatConfigs.strict,
  // @ts-expect-error Target allows only 0 element(s) but source may have more.ts(2345)
  solidTsConfig,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  stylistic.configs.recommended,
  prettierRecommended,
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      parserOptions: {
        ...jsxA11y.flatConfigs.strict.languageOptions,
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
    },
  },
  {
    files: ['**/*.html'],
    ...html.configs['flat/recommended'],
    rules: {
      ...html.configs['flat/recommended'].rules,
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      '@html-eslint/no-extra-spacing-attrs': [
        'error',
        { enforceBeforeSelfClose: true },
      ],
      '@html-eslint/attrs-newline': 'off',
    },
  },
  jsonc.configs['flat/recommended-with-jsonc'],
  jsonc.configs['flat/prettier'],
  yml.configs['flat/recommended'],
  yml.configs['flat/prettier'],
  {
    files: ['**/*.{html,json,yml,yaml}'],
    ...tseslintConfigs.disableTypeChecked,
  },
);
