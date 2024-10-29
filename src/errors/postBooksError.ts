export class postBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, postBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
