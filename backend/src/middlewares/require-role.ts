import { StatusCode } from "@/config/http";
import { AppError } from "@/utils/app-error";
import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden", StatusCode.FORBIDDEN);
    }
    next();
  };
};
