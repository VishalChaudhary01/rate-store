import z from "zod";

export const nameSchema = z
  .string("Name is required")
  .min(20, "Name must be at least 20 characters long")
  .max(60, "Name must be at most 60 characters long");

export const addressSchema = z
  .string("Address is required")
  .max(400, "Address must be at most 400 characters long");

export const emailSchema = z
  .string("Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .max(16, "Password must be at most 16 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const idSchema = z.string("Id is required");
