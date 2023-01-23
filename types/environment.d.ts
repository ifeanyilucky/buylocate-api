export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_ID: string;
      MONGODB_URI: string;
      FLW_PUBLIC_KEY: string;
      FLW_SECRET_KEY: string;
      FLW_ENCRYPTION_KEY: string;
      USER_VERIFICATION_SECRET_TOKEN: string;
      DB_PORT: number;
      DB_USER: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
