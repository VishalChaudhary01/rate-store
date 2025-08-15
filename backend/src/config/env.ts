import { getEnv } from "@/utils/get-env";

export const config = {
  PORT: getEnv("PORT", "3000"),
};
