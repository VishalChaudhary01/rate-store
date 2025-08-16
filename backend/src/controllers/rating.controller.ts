import { prisma } from "@/config/db";
import { StatusCode } from "@/config/http";
import { AppError } from "@/utils/app-error";
import { getUserId } from "@/utils/get-user-id";
import { Request, Response } from "express";

// NORMAL_USER ACCESS
export const submitRating = async (req: Request, res: Response) => {
  const userId = getUserId(req.user?.id);
  const { storeId, rating } = req.body;

  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new AppError("Store not found", StatusCode.NOT_FOUND);
  }

  if (store.ownerId === userId) {
    throw new AppError(
      "Not allowed to rat their own store",
      StatusCode.BAD_REQUEST
    );
  }

  const existingRating = await prisma.rating.findFirst({
    where: { storeId, userId },
  });

  let userRating;

  if (existingRating) {
    userRating = await prisma.rating.update({
      where: { id: existingRating.id },
      data: { rating },
    });
  } else {
    userRating = await prisma.rating.create({
      data: { storeId, userId, rating },
    });
  }

  res.status(200).json({
    message: existingRating
      ? "Rating updated successfully"
      : "Rating submitted successfully",
    rating: userRating,
  });
};

// SYSTEM_ADMIN ACCESS
export const adminGetRatings = async (_req: Request, res: Response) => {
  const ratings = await prisma.rating.findMany({});

  res
    .status(200)
    .json({ message: "Admin fetched ratings successfully", ratings });
};
