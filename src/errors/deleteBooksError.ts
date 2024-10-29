export class deleteBooksError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, deleteBooksError.prototype); //https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    }
}
