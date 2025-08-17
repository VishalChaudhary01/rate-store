import { Router } from "express";
import { authRoutes } from "./auth.route";
import { storeRoutes } from "./store.route";
import { authRequire } from "@/middlewares/auth-require";
import { ratingRoutes } from "./rating.route";
import { userRoutes } from "./usre.route";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/stores", authRequire, storeRoutes);
routes.use("/ratings", authRequire, ratingRoutes);
routes.use("/users", authRequire, userRoutes);
