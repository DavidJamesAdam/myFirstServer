"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooksError = void 0;
const customError_1 = require("../utils/customError");
class deleteBooksError extends customError_1.customError {
    constructor() {
        super("Error: book not deleted.");
        this.statusCode = 400;
        Object.setPrototypeOf(this, deleteBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize() {
        return { message: "Error. Book not deleted." };
    }
}
exports.deleteBooksError = deleteBooksError;
