import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/config/db";
import { config } from "@/config/env";
import { StatusCode } from "@/config/http";
import { AppError } from "@/utils/app-error";

export const signup = async (req: Request, res: Response) => {
  const inputs = req.body;

  const isExist = await prisma.user.findFirst({
    where: { email: inputs.email },
  });

  if (isExist) {
    throw new AppError("User already exist", StatusCode.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(inputs.password, 12);

  await prisma.user.create({
    data: {
      ...inputs,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User registered successfully" });
};

export const signin = async (req: Request, res: Response) => {
  const inputs = req.body;
  const user = await prisma.user.findFirst({ where: { email: inputs.email } });

  if (!user) {
    throw new AppError("User not found", StatusCode.NOT_FOUND);
  }

  const isPasswordValid = await bcrypt.compare(inputs.password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", StatusCode.UNAUTHORIZED);
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res
    .cookie(config.AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "User logged-in successfully " });
};

export const signout = async (_req: Request, res: Response) => {
  res
    .clearCookie(config.AUTH_COOKIE_NAME)
    .status(200)
    .json({ message: "User logged-out successfully" });
};

export const updatePassword = async (req: Request, res: Response) => {
  const inputs = req.body;
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found", StatusCode.NOT_FOUND);
  }

  const hashedNewPassword = await bcrypt.hash(inputs.password, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });

  res.status(200).json({ message: "Password updated successfully" });
};
