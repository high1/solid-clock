/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
