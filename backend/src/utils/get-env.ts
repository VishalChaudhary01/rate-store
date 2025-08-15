export const getEnv = (key: string, defaultValue = ""): string => {
  const value = process.env[key];
  if (!value) {
    if (!defaultValue) {
      throw new Error(`Environment variable ${key} is not set in env file`);
    }
    return defaultValue;
  }
  return value;
};
