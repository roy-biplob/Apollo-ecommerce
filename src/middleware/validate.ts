// src/middleware/validate.ts

import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: err.errors.map((e) => e.message).join(", "),
        });
      }
      next(err);
    }
  };
