export type CustomErrorContnent = {
    message: { [key: string]: string }, // Would like this to be an object
    context?: { [key: string]: any }
};

export abstract class CustomError extends Error {
    abstract readonly statusCode: number;
    abstract readonly errors: CustomErrorContnent[];

    constructor(message: {[key: string]: string}) {
        super(JSON.stringify(message));
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
