/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AVAILABLE_REPORTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
