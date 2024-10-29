export class putBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, putBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
