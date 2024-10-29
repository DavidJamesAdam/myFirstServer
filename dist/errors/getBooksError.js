"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksError = void 0;
const customError_1 = require("../utils/customError");
class getBooksError extends customError_1.customError {
    constructor() {
        super('book not found');
        this.statusCode = 404;
        Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize() {
        return { message: "error. book not found" };
    }
}
exports.getBooksError = getBooksError;
