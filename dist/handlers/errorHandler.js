"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../errors/customError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof customError_1.CustomError) {
        const { statusCode, errors } = err;
        res.status(statusCode).send({ errors });
    }
    console.error(JSON.stringify(err, null, 2));
    res.status(500).send({ errors: [{ message: "Internal Server Error" }] });
};
exports.errorHandler = errorHandler;
