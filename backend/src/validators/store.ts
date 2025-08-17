import { z } from "zod";
import { addressSchema, idSchema, nameSchema } from "./common";

export const addStoreSchema = z.object({
  name: nameSchema,
  address: addressSchema,
  ownerId: idSchema,
});

export const addRatingSchema = z.object({
  storeId: idSchema,
  rating: z
    .number("Rating is required")
    .positive("Rating must be between 1 and 5")
    .max(5, { message: "Rating must be between 1 and 5" }),
});
