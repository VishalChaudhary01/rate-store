import { Request, Response, NextFunction } from "express";
import { StatusCode } from "@/config/http";
import { AppError } from "@/utils/app-error";
import { ZodError } from "zod";

export const validate =
  (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues
        .map((err: ZodError) => err.message)
        .join(", ");
      throw new AppError(message, StatusCode.BAD_REQUEST);
    }
    next();
  };
