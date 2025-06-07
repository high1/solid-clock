/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
  readonly BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
