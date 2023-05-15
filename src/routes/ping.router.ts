import express, { Request, Response, NextFunction } from "express";

import PingController from "../controllers/ping.controller";
import { errorListener } from "../errors/errorHandler";

const router = express.Router();

router.get(
  "/",
  errorListener(async (_req: Request, res: Response, _next: NextFunction) => {
    const controller = new PingController();
    const response = await controller.getMessage();

    return res.json(response);
  })
);

export default router;
