/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly BASE?: string;
}
