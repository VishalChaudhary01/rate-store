import { adminGetRatings, submitRating } from "@/controllers/rating.controller";
import { requireRole } from "@/middlewares/require-role";
import { Router } from "express";

export const ratingRoutes = Router();

ratingRoutes.post("/", requireRole("NORMAL_USER"), submitRating);
ratingRoutes.get("/", requireRole("SYSTEM_ADMIN"), adminGetRatings);
