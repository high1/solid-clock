/* eslint-disable import-x/no-named-as-default-member */
import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import solid from 'eslint-plugin-solid';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import jsonc from 'eslint-plugin-jsonc';
import yml from 'eslint-plugin-yml';
import { importX } from 'eslint-plugin-import-x';
import stylistic from '@stylistic/eslint-plugin';
import html from '@html-eslint/eslint-plugin';
import { fileURLToPath } from 'node:url';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  jsxA11y.flatConfigs.strict,
  solid.configs['flat/typescript'],
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
  // @ts-expect-error Type 'undefined' is not assignable to type '(string | string[])[]'.ts(2345)
  jsonc.configs['flat/recommended-with-jsonc'],
  jsonc.configs['flat/prettier'],
  yml.configs['flat/recommended'],
  yml.configs['flat/prettier'],
  {
    files: ['**/*.{html,json,yml,yaml}'],
    ...tseslint.configs.disableTypeChecked,
  },
);
