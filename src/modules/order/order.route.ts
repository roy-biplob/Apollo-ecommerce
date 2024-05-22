import express from "express";
import { orderControllers } from "./order.controller";
import { validate } from "../../middleware/validate";
import {
  getAllOrdersSchemaValidate,
  orderSchemaZodValidation,
} from "../../zod.validation";

const router = express.Router();

// will call controller func
router.post(
  "/",
  validate(orderSchemaZodValidation),
  orderControllers.createOrder
);
router.get(
  "/",
  validate(getAllOrdersSchemaValidate),
  orderControllers.getAllOrders
);

export const OrderRoutes = router;
