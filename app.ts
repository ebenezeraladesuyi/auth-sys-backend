import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import gamerouter from "./gamesRoute";

export const appConfig = (app: Application) => {
  app.use(cors()).use(morgan("dev")).use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Api Up ✔💕❤💖",
    });
  });
  app.use("/api", router);
  app.use("/api", gamerouter);
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
      message: `This Route ${req.body} is not Found `,
    });
  });
};
