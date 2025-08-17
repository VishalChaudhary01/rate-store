import { Request, Response } from "express";
import { prisma } from "@/config/db";
import { AppError } from "@/utils/app-error";
import { StatusCode } from "@/config/http";
import { Prisma, Role } from "@prisma/client";

// ADMIN ACCESS -> Admin fetch list of users
export const adminGetUsers = async (req: Request, res: Response) => {
  const { name, email, address, role } = req.query;

  const filters = {
    ...(name ? { name: { contains: String(name), mode: "insensitive" } } : {}),
    ...(email
      ? { email: { contains: String(email), mode: "insensitive" } }
      : {}),
    ...(address
      ? { address: { contains: String(address), mode: "insensitive" } }
      : {}),
    ...(role ? { role: String(role).toUpperCase() as Role } : {}),
  };

  // fetch users

  const [totalUsers, users] = await Promise.all([
    prisma.user.findMany({
      where: filters as Prisma.UserWhereInput | undefined,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    }),

    prisma.user.count({
      where: filters as Prisma.UserWhereInput | undefined,
    }),
  ]);

  res.status(200).json({
    message: "Users fetched successfully",
    totalUsers,
    users,
  });
};

// ADMIN ACCESS -> Admin fetch user details (including role, and store rating if owner)
export const adminGetUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      stores: {
        include: {
          ratings: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("User not found", StatusCode.NOT_FOUND);
  }

  let averageRating: number | null = null;

  if (user.stores.length > 0) {
    const allRatings = user.stores.flatMap((store) => store.ratings);
    if (allRatings.length > 0) {
      averageRating =
        allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;
    }
  }

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      ...(averageRating !== null && { averageRating }),
    },
  });
};
