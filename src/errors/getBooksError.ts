import { customError } from "../utils/customError";

// export class getBooksError extends Error {
//     statusCode: Number = 404;
//     constructor(id: Number) {
//         super(`book with ID: ${id} not found`);
//         Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
//     }
// }
export class getBooksError extends customError {
    statusCode = 404;
    constructor(id: Number) {
        super(`book with ${id} not found`);
        Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize(): { error: string; } {
        return { error: `book not found`};
    }
}
