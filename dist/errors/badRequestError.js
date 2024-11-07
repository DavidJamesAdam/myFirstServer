"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
class BadRequestError extends customError_1.CustomError {
    constructor(params) {
        const { code, message } = params || {};
        super(message || "Bad Request");
        this._code = code || BadRequestError._statusCode;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._code;
    }
}
BadRequestError._statusCode = 400;
exports.default = BadRequestError;
