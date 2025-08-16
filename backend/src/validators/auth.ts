import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string("Name is required")
    .min(20, "Name must be at least 20 characters long")
    .max(60, "Name must be at most 60 characters long"),
  email: z.string("Email is required").email("Invalid email address"),
  address: z
    .string("Address is required")
    .max(400, "Address must be at most 400 characters long"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must be at most 16 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const signinSchema = z.object({
  email: z.string("Email is required").email("Invalid email address"),
  password: z.string("Password is required").min(1, "Password is required"),
});

export const updatePasswordSchema = z.object({
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must be at most 16 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
