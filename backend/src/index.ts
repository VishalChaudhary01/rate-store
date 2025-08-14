import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy server " });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
