"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksError = void 0;
class getBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
exports.getBooksError = getBooksError;
