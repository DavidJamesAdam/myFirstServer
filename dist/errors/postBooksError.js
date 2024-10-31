"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBooksError = void 0;
const customError_1 = require("../utils/customError");
class postBooksError extends customError_1.customError {
    constructor() {
        super("book not added.");
        this.statusCode = 400;
        Object.setPrototypeOf(this, postBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize() {
        return { error: "book not added." };
    }
}
exports.postBooksError = postBooksError;