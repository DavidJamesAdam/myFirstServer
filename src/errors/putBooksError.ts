import { customError } from "../utils/customError";

export class putBooksError extends customError {
    statusCode = 400;
    constructor() {
        super("book not updated");
        Object.setPrototypeOf(this, putBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
    serialize(): { error: string; } {
        return { error: "book not added."};
    }
}
