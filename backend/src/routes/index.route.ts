import { Router } from "express";
import { authRoutes } from "./auth.route";

export const routes = Router();

routes.use("/auth", authRoutes);
