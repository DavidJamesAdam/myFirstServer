export type CustomErrorContnent = {
    message: string, // Would like this to be an object
    context?: { [key: string]: any }
};

export abstract class CustomError extends Error {
    abstract readonly statusCode: number;
    abstract readonly errors: CustomErrorContnent[];

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
