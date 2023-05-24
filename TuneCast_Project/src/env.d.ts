interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_WEATHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}