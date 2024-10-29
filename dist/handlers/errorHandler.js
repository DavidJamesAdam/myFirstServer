"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../utils/customError");
const errorHandler = (error, req, res, next) => {
    if (error instanceof customError_1.customError) {
        res.status(error.statusCode).json(error.serialize());
    }
    ;
    res.status(500).json({ message: "An error occured" });
};
exports.errorHandler = errorHandler;
