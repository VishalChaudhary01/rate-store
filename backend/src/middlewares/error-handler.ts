import { ErrorRequestHandler } from "express";
import { StatusCode } from "@/config/http";
import { getErrorMessage } from "@/utils/get-error-message";
import { AppError } from "@/utils/app-error";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
): any => {
  console.error(`Error occure on PATh: ${req.path} `, error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    message:
      "We’re sorry for the inconvenience. Something went wrong on our end. Please try again later.",
    error: getErrorMessage(error),
  });
  return;
};
