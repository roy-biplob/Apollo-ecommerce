import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { productModel } from "../product/product.model";

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      //   error: err,
    });
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
};
