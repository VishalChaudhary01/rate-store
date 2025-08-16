import { AppError } from "./app-error";
import { StatusCode } from "@/config/http";

export const getUserId = (userId = "") => {
  if (!userId) {
    throw new AppError("Unauthorized", StatusCode.UNAUTHORIZED);
  }

  return userId;
};
