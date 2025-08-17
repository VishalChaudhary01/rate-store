import { Router } from "express";
import {
  adminGetUserDetails,
  adminGetUsers,
} from "@/controllers/user.controller";
import { requireRole } from "@/middlewares/require-role";

export const userRoutes = Router();

userRoutes.get("/", requireRole("SYSTEM_ADMIN"), adminGetUsers);
userRoutes.get("/:userId", requireRole("SYSTEM_ADMIN"), adminGetUserDetails);
