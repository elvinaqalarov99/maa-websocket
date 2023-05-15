import { NextFunction, Request, Response } from "express";

// Middleware listener function to handle errors
export const errorListener = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const data = {
    status: 500,
    data: [],
    errors: [
      {
        name: error.name,
        message: error.message,
      },
    ],
  };

  if (error.name === "ValidationError") {
    data.status = 400;
  }

  return res.status(data.status).json(data);
};
