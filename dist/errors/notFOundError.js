"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
class NotFoundError extends customError_1.CustomError {
    constructor(params) {
        const { code, message } = params || {};
        super(message || "Not Found");
        this._code = code || NotFoundError._statusCode;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._code;
    }
}
NotFoundError._statusCode = 404;
exports.default = NotFoundError;
