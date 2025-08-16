import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCode } from "@/config/http";
import { config } from "@/config/env";
import { AppError } from "@/utils/app-error";
import { Role } from "@prisma/client";

export const authRequire = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.[config.AUTH_COOKIE_NAME];
    if (!token) {
      throw new AppError("Token not found", StatusCode.UNAUTHORIZED);
    }

    const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload & {
      userId: string;
      role: Role;
    };

    if (!payload?.userId) {
      throw new AppError("Invalid token payload", StatusCode.UNAUTHORIZED);
    }

    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", StatusCode.UNAUTHORIZED));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", StatusCode.UNAUTHORIZED));
    }
    next(error);
  }
};
