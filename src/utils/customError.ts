export abstract class customError extends Error {
    constructor(public message: string) {
        super(message);
    }
    abstract statusCode: number;
    abstract serialize() : {error: string};
}
