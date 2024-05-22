// src/middleware/notFoundHandler.ts

import { Request, Response, NextFunction } from "express";

const routeNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export default routeNotFoundHandler;
