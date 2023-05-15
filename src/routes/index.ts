import express from "express";

import userRouter from "./user.router";
import pingRouter from "./ping.router";
import { errorHandler } from "../errors/errorHandler";

const router = express.Router();

router.use("/users", userRouter);
router.use("/ping", pingRouter);

// error handler middleware, should be after all routes
router.use(errorHandler);

export default router;
