export class getBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, getBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
