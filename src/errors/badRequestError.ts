import { CustomError } from "./customError";

export default class BadRequestError extends CustomError {
    private static readonly _statusCode = 400;
    private readonly _code: number;
    private readonly _context: { [key: string]: any };

    constructor(params?: {code?: number, message?: string, context?: { [key: string]: any }}) {
        const { code, message } = params || {};
        
        super(message || "Bad Request");
        this._code = code || BadRequestError._statusCode;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get statusCode() {
        return this._code;
    }
}
