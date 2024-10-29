"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBooksError = void 0;
class postBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, postBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
exports.postBooksError = postBooksError;
