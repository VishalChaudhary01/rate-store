import "module-alias/register";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { routes } from "./routes/index.route";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = config.PORT;

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy server " });
});

app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
