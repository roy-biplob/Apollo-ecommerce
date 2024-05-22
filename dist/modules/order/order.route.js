"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validate_1 = require("../../middleware/validate");
const zod_validation_1 = require("../../zod.validation");
const router = express_1.default.Router();
// will call controller func
router.post("/", (0, validate_1.validate)(zod_validation_1.orderSchemaZodValidation), order_controller_1.orderControllers.createOrder);
router.get("/", (0, validate_1.validate)(zod_validation_1.getAllOrdersSchemaValidate), order_controller_1.orderControllers.getAllOrders);
exports.OrderRoutes = router;
