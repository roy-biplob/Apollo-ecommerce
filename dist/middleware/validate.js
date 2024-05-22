"use strict";
// src/middleware/validate.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: err.errors.map((e) => e.message).join(", "),
            });
        }
        next(err);
    }
};
exports.validate = validate;
