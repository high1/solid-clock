/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
