
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@tanstack/react-query" />
/// <reference types="react-router-dom" />
/// <reference types="lucide-react" />
/// <reference path="./types/react.d.ts" />
/// <reference path="./types/tanstack.d.ts" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
