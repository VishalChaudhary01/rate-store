import { getEnv } from "@/utils/get-env";

export const config = {
  PORT: getEnv("PORT", "3000"),
  JWT_SECRET: getEnv("JWT_SECRET", "my-secret"),
  AUTH_COOKIE_NAME: getEnv("AUTH_COOKIE_NAME", "sotre-auth-cookie"),
};
