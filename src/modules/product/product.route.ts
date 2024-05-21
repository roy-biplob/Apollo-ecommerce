import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// will call controller func
router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateSingleProduct);

export const productRoutes = router;
