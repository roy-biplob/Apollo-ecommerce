"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderControllers = void 0;
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
const zod_validation_1 = require("../../zod.validation");
// create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        const result = yield order_service_1.OrderServices.createOrderIntoDB(email, productId, price, quantity);
        res.status(200).json({
            success: true,
            message: `Order created successfully!`,
            data: result,
        });
    }
    catch (err) {
        {
            if (err instanceof zod_1.z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: err.errors.map((e) => e.message).join(", "),
                });
            }
            else {
                const error = err;
                res.status(500).json({
                    success: false,
                    message: error.message || "Something went wrong",
                });
            }
        }
    }
});
//get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        zod_validation_1.getAllOrdersSchemaValidate.parse(req.query);
        const orderMail = req.query.email;
        const result = yield order_service_1.OrderServices.getAllOrdersIntoDB(orderMail);
        if (orderMail) {
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for user email!`,
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully!`,
                data: result,
            });
        }
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: err.errors.map((e) => e.message).join(", "),
            });
        }
        else {
            const error = err;
            res.status(500).json({
                success: false,
                message: error.message || "Something went wrong",
                error: error,
            });
        }
    }
});
exports.orderControllers = {
    createOrder,
    getAllOrders,
};
