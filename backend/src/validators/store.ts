import { z } from "zod";
import { addressSchema, idSchema, nameSchema } from "./common";

export const addStoreSchema = z.object({
  name: nameSchema,
  address: addressSchema,
  ownerId: idSchema,
});
