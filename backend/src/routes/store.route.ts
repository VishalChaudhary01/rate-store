import { Router } from "express";
import { validate } from "@/middlewares/input-validate";
import { requireRole } from "@/middlewares/require-role";
import { addStoreSchema } from "@/validators/store";
import {
  adminAddStore,
  adminGetStores,
  ownerGetStores,
  userGetStores,
} from "@/controllers/store.controller";

export const storeRoutes = Router();

storeRoutes.post(
  "/admin/add",
  requireRole("SYSTEM_ADMIN"),
  validate(addStoreSchema),
  adminAddStore
);
storeRoutes.get("/admin/get", requireRole("SYSTEM_ADMIN"), adminGetStores);

storeRoutes.get("/owner/get", requireRole("NORMAL_USER"), ownerGetStores);

storeRoutes.get("/", requireRole("NORMAL_USER"), userGetStores);
