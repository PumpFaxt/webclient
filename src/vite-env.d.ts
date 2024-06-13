/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_HUDDLE_API_KEY: string;
  readonly VITE_HUDDLE_PROJECT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>;
  }
}
Object.typedKeys = Object.keys as any;
