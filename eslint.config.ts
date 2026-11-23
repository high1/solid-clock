/* eslint-disable import-x/no-named-as-default-member */
import e18e from '@e18e/eslint-plugin';
import css from '@eslint/css';
import eslint from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import html from '@html-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import tailwindcss from 'eslint-plugin-better-tailwindcss';
import { importX } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import solidTsConfig from 'eslint-plugin-solid';
import yml from 'eslint-plugin-yml';
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

import requireSpaceAfterControlParen from '#/eslint-rule';

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/index.css',
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
      // TODO: drop this once eslint-plugin-solid types `meta` without `| undefined`.
      // @ts-expect-error Type 'undefined' is not assignable to type 'RulesMeta<string, unknown[], unknown>'.ts(2322)
      solidTsConfig.configs['v2-strict'],
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      stylistic.configs.customize({ semi: true }),
      tailwindcss.configs.correctness,
      perfectionist.configs['recommended-natural'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ...jsxA11y.flatConfigs.strict.languageOptions,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      local: {
        rules: { 'space-after-control-paren': requireSpaceAfterControlParen },
      },
    },
    rules: {
      // Class order is enforced here (v6 styles), not by prettier.
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      'better-tailwindcss/enforce-canonical-classes': 'error',
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/enforce-consistent-important-position': 'error',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/enforce-consistent-variant-order': 'error',
      'better-tailwindcss/enforce-logical-properties': 'error',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'curly': ['error', 'multi-or-nest'],
      'local/space-after-control-paren': 'error',
      // TS-only overrides; the `typescript` preset would reset v2-strict severities.
      'solid/jsx-no-undef': ['error', { typescriptEnabled: true }],
      'solid/no-unknown-namespaces': 'off',
    },
  },
  {
    extends: [json.configs.recommended, prettierRecommended],
    files: ['**/*.json'],
    language: 'json/json',
    rules: { 'json/sort-keys': ['error', 'asc', { natural: true }] },
  },
  {
    files: ['package.json'],
    rules: { 'json/sort-keys': ['error', 'asc'] },
  },
  {
    extends: [yml.configs.standard],
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
  {
    extends: [markdown.configs.recommended, prettierRecommended],
    files: ['**/*.md'],
    language: 'markdown/commonmark',
  },
);
