import { customError } from "../utils/customError";

export class deleteBooksError extends customError {
    statusCode = 400;
    constructor() {
        super("Error: book not deleted.");
        Object.setPrototypeOf(this, deleteBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize(): { message: string; } {
        return { message: "Error. Book not deleted."};
    }
}
