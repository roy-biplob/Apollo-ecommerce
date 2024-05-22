"use strict";
// src/middleware/notFoundHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
const routeNotFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};
exports.default = routeNotFoundHandler;
