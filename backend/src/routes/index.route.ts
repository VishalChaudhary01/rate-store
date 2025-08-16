import { Router } from "express";
import { authRoutes } from "./auth.route";
import { storeRoutes } from "./store.route";
import { authRequire } from "@/middlewares/auth-require";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/stores", authRequire, storeRoutes);
