import { prisma } from "@/config/db";
import { getUserId } from "@/utils/get-user-id";
import { Request, Response } from "express";

// ADMIN ACCESS
export const adminAddStore = async (req: Request, res: Response) => {
  await prisma.store.create({ data: { ...req.body } });

  res.status(201).json({ message: "Store added successfully" });
};

// ADMIN ACCESS
export const adminGetStores = async (req: Request, res: Response) => {
  const { name, address } = req.query;

  const stores = await prisma.store.findMany({
    where: {
      ...(name
        ? { name: { contains: String(name), mode: "insensitive" } }
        : {}),
      ...(address
        ? { address: { contains: String(address), mode: "insensitive" } }
        : {}),
    },
    include: {
      ratings: {
        select: { rating: true },
      },
    },
  });

  // Calculate average rating
  const result = stores.map((store) => {
    const avg =
      store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
          store.ratings.length
        : null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating: avg,
    };
  });

  res
    .status(200)
    .json({ message: "Admin fetched stores successfully", stores: result });
};

// NORMAL_USER AS STORE OWNER
export const ownerGetStores = async (req: Request, res: Response) => {
  const userId = getUserId(req.user?.id);
  const stores = await prisma.store.findMany({
    where: { ownerId: userId },
    include: {
      ratings: {
        select: {
          rating: true,
          user: { select: { id: true, name: true, email: true } },
        },
      },
    },
  });

  const result = stores.map((store) => {
    const avg =
      store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
          store.ratings.length
        : null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating: avg,
      ratings: store.ratings.map((r) => ({
        userId: r.user.id,
        userName: r.user.name,
        userEmail: r.user.email,
        rating: r.rating,
      })),
    };
  });
  res.status(200).json({
    message: "Owner fetched their stores successfully",
    stores: result,
  });
};

// NORAML_USER ACCESS
export const userGetStores = async (req: Request, res: Response) => {
  const userId = getUserId(req.user?.id);
  const { name, address } = req.query;

  const stores = await prisma.store.findMany({
    where: {
      ...(name
        ? { name: { contains: String(name), mode: "insensitive" } }
        : {}),
      ...(address
        ? { address: { contains: String(address), mode: "insensitive" } }
        : {}),
    },
    include: {
      ratings: {
        select: { userId: true, rating: true },
      },
    },
  });

  const result = stores.map((store) => {
    const overallRating =
      store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
          store.ratings.length
        : null;

    const userRating =
      store.ratings.find((r) => r.userId === userId)?.rating ?? null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      overallRating,
      userRating,
    };
  });

  res.status(200).json({
    message: "Stores fetched successfully",
    stores: result,
  });
};
