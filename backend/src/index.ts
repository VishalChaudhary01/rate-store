import "module-alias/register";
import express, { Request, Response } from "express";
import { config } from "./config/env";

const app = express();

const PORT = config.PORT;

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy server " });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
