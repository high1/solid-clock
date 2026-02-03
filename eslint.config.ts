/* eslint-disable import-x/no-named-as-default-member */
import { includeIgnoreFile } from '@eslint/compat';
import css from '@eslint/css';
import eslint from '@eslint/js';
import html from '@html-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import jsonc from 'eslint-plugin-jsonc';
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
      jsxA11y.flatConfigs.strict,
      // @ts-expect-error Types of property create are incompatible. (ts 2322)
      solidTsConfig,
      // @ts-expect-error Types of property languageOptions are incompatible. (ts 2322)
      importX.flatConfigs.recommended,
      // @ts-expect-error Types of property languageOptions are incompatible. (ts 2322)
      importX.flatConfigs.typescript,
      stylistic.configs.customize({
        semi: true,
      }),
      perfectionist.configs['recommended-natural'],
      prettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    rules: {
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
    extends: [
      jsonc.configs['flat/recommended-with-jsonc'],
      prettierRecommended,
      jsonc.configs['flat/prettier'],
    ],
    files: ['**/*.json'],
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
    extends: ['css/recommended', prettierRecommended],
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    rules: {
      'css/no-invalid-at-rules': 'off',
    },
  },
  {
    extends: ['html/recommended'],
    files: ['**/*.html'],
    language: 'html/html',
    plugins: { html },
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
