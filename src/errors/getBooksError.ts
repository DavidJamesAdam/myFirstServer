import { customError } from "../utils/customError";

export class getBooksError extends customError {
    statusCode = 404;
    constructor() {
        super('book not found');
        Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize(): { message: string; } {
        return { message: "error. book not found"};
    }
}
