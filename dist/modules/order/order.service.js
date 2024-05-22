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
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (email, productId, price, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the product to check inventory
    const findProduct = yield product_model_1.productModel.findById(productId);
    if (!findProduct) {
        throw new Error("Product not found");
    }
    if (findProduct.inventory.quantity < quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    // Create the order
    const createOrder = new order_model_1.OrderModel({ email, productId, price, quantity });
    yield createOrder.save();
    // Update the product inventory
    findProduct.inventory.quantity -= quantity;
    findProduct.inventory.inStock = findProduct.inventory.quantity > 0;
    yield findProduct.save();
    return createOrder;
});
// get all orders
const getAllOrdersIntoDB = (orderMail) => __awaiter(void 0, void 0, void 0, function* () {
    if (orderMail) {
        const findOrderWithMail = yield order_model_1.OrderModel.find({ email: orderMail });
        return findOrderWithMail;
    }
    const result = yield order_model_1.OrderModel.find();
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersIntoDB,
};
