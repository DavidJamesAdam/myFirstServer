"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksError = void 0;
const customError_1 = require("../utils/customError");
// export class getBooksError extends Error {
//     statusCode: Number = 404;
//     constructor(id: Number) {
//         super(`book with ID: ${id} not found`);
//         Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
//     }
// }
class getBooksError extends customError_1.customError {
    constructor(id) {
        super(`book with ${id} not found`);
        this.statusCode = 404;
        Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize() {
        return { error: `book not found` };
    }
}
exports.getBooksError = getBooksError;
