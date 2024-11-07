import { CustomError } from "./customError";

export default class NotFoundError extends CustomError {
    private static readonly _statusCode = 404;
    private readonly _code: number;
    private readonly _context: { [key: string]: any };

    constructor(params?: {code?: number, message?: string, context?: { [key: string]: any }}) {
        const { code, message } = params || {};
        
        super(message || "Not Found");
        this._code = code || NotFoundError._statusCode;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get statusCode() {
        return this._code;
    }
}
