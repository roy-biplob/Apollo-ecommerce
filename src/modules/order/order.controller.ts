import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { CustomError } from "./order.interface";
import { z } from "zod";

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;
    const result = await OrderServices.createOrderIntoDB(
      email,
      productId,
      price,
      quantity
    );
    res.status(200).json({
      success: true,
      message: `Order created successfully!`,
      data: result,
    });
  } catch (err) {
    {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: err.errors.map((e) => e.message).join(", "),
        });
      } else {
        const error = err as CustomError;
        res.status(500).json({
          success: false,
          message: error.message || "Something went wrong",
        });
      }
    }
  }
};

//get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderMail = req.query.email as string;
    const result = await OrderServices.getAllOrdersIntoDB(orderMail);

    if (orderMail) {
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully!`,
        data: result,
      });
    }
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
};
