import express from "express";
import { orderControllers } from "./order.controller";

const router = express.Router();

// will call controller func
router.post("/", orderControllers.createOrder);

export const OrderRoutes = router;
