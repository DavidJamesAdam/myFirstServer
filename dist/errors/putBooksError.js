"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBooksError = void 0;
class putBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, putBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
exports.putBooksError = putBooksError;
