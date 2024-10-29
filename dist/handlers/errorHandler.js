"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500).json({ message: error.message });
}
;
