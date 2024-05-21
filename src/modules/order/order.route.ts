import express from "express";
import { orderControllers } from "./order.controller";

const router = express.Router();

// will call controller func
router.post("/", orderControllers.createOrder);
router.get("/", orderControllers.getAllOrders);

export const OrderRoutes = router;
