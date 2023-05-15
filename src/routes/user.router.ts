import express, { NextFunction, Request, Response } from "express";

import UserController from "../controllers/user.controller";
import { errorListener } from "../errors/errorHandler";

const router = express.Router();

router.get(
  "/",
  errorListener(async (_req: Request, res: Response, _next: NextFunction) => {
    const controller = new UserController();
    const response = await controller.getUsers();

    return res.status(response.status).json(response);
  })
);

router.post(
  "/",
  errorListener(async (req: Request, res: Response, _next: NextFunction) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body);

    return res.json(response);
  })
);

router.get(
  "/:id",
  errorListener(async (req: Request, res: Response, _next: NextFunction) => {
    const controller = new UserController();
    const response = await controller.getUser(req.params.id);

    return res.json(response);
  })
);

export default router;
