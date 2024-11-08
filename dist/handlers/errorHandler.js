"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../errors/customError");
const library_1 = require("@prisma/client/runtime/library");
const errorHandler = (err, req, res, next) => {
    var _a;
    if (err instanceof customError_1.CustomError) {
        const { statusCode, errors } = err;
        return res.status(statusCode).send({ errors });
    }
    else if (err instanceof library_1.PrismaClientValidationError) {
        // Checking for path errors or if the id is missing in path
        return res.status(400).json({ error: "Argument `id` is missing." });
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        const cause = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.cause;
        return res.status(404).json({ error: cause });
    }
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Internal Server Error" }] });
};
exports.errorHandler = errorHandler;
