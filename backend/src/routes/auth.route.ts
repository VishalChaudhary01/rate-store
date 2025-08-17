import { Router } from "express";
import {
  signin,
  signup,
  signout,
  updatePassword,
} from "@/controllers/auth.controller";
import { validate } from "@/middlewares/input-validate";
import {
  signinSchema,
  signupSchema,
  updatePasswordSchema,
} from "@/validators/auth";
import { authRequire } from "@/middlewares/auth-require";
import { requireRole } from "@/middlewares/require-role";

export const authRoutes = Router();

authRoutes.post("/sign-up", validate(signupSchema), signup);
authRoutes.post("/sign-in", validate(signinSchema), signin);
authRoutes.post("/sign-out", authRequire, signout);
authRoutes.post(
  "/update-password",
  authRequire,
  requireRole("NORMAL_USER"),
  validate(updatePasswordSchema),
  updatePassword
);
