/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_AUTH_COOKIE_LIFETIME: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
