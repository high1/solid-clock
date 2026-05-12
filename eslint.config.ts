/* eslint-disable import-x/no-named-as-default-member */
import e18e from '@e18e/eslint-plugin';
import { includeIgnoreFile } from '@eslint/config-helpers';
import css from '@eslint/css';
import eslint from '@eslint/js';
import json from '@eslint/json';
import html from '@html-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import solidTsConfig from 'eslint-plugin-solid/configs/typescript';
import yml from 'eslint-plugin-yml';
import { defineConfig, globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      parserOptions: {
        ...jsxA11y.flatConfigs.strict.languageOptions,
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.css'],
        projectService: true,
      },
    },
  },
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      e18e.configs.recommended,
      jsxA11y.flatConfigs.strict,
      // @ts-expect-error Types of property create are incompatible. (ts 2322)
      solidTsConfig,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      stylistic.configs.customize({
        semi: true,
      }),
      perfectionist.configs['recommended-natural'],
      prettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },
  },
  {
    extends: [json.configs.recommended, prettierRecommended],
    files: ['**/*.json'],
    language: 'json/json',
    rules: { 'json/sort-keys': ['error', 'asc', { natural: true }] },
  },
  {
    extends: [
      yml.configs.recommended,
      prettierRecommended,
      yml.configs.prettier,
    ],
    files: ['**/*.{yml,yaml}'],
  },
  {
    extends: [css.configs.recommended, prettierRecommended],
    files: ['**/*.css'],
    language: 'css/css',
    rules: {
      'css/no-invalid-at-rules': 'off',
    },
  },
  {
    extends: [html.configs.recommended],
    files: ['**/*.html'],
    language: 'html/html',
    rules: {
      'html/attrs-newline': [
        'error',
        { closeStyle: 'newline', ifAttrsMoreThan: 3 },
      ],
      'html/indent': ['error', 2],
      'html/no-trailing-spaces': 'error',
    },
  },
);
