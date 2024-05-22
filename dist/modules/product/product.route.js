"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// will call controller func
router.post("/", product_controller_1.ProductControllers.createProduct);
router.get("/", product_controller_1.ProductControllers.getAllProducts);
router.get("/:productId", product_controller_1.ProductControllers.getSingleProduct);
router.put("/:productId", product_controller_1.ProductControllers.updateSingleProduct);
router.delete("/:productId", product_controller_1.ProductControllers.deleteSingleProduct);
// router.get("/searchTerm", ProductControllers.searchSingleProduct);
exports.productRoutes = router;
