declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "SYSTEM_ADMIN" | "NORMAL_USER" | "STORE_OWNER";
      };
    }
  }
}

export {};
