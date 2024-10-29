"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBooksError = void 0;
const customError_1 = require("../utils/customError");
class putBooksError extends customError_1.customError {
    constructor() {
        super("Error: boo not updated");
        this.statusCode = 400;
        Object.setPrototypeOf(this, putBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize() {
        return { message: "Error. Book not added." };
    }
}
exports.putBooksError = putBooksError;
