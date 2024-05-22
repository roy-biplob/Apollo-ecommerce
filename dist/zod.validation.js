"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersSchemaValidate = exports.orderSchemaZodValidation = exports.productSchemaZodValidation = void 0;
const zod_1 = require("zod");
exports.productSchemaZodValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tag must be a non-empty string")),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string().min(1, "Variant type is required"),
        value: zod_1.z.string().min(1, "Variant value is required"),
    })),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().min(0, "Quantity must be a positive number"),
        inStock: zod_1.z.boolean(),
    }),
});
exports.orderSchemaZodValidation = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
});
exports.getAllOrdersSchemaValidate = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address").optional(),
});
