import { z } from "zod";
import {
  addressSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from "./common";

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  address: addressSchema,
  password: passwordSchema,
});

export const signinSchema = z.object({
  email: emailSchema,
  password: z
    .string("Password is required")
    .min(1, "Password must be at least 1 characters long"),
});

export const updatePasswordSchema = z.object({
  password: passwordSchema,
});
