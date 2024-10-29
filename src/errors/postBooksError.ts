import { customError } from "../utils/customError";

export class postBooksError extends customError {
    statusCode = 400;
    constructor() {
        super("Error. Book not added.");
        Object.setPrototypeOf(this, postBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize(): { message: string; } {
        return { message: "Error. Book not added."};
    }
}
