import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { customError } from "../utils/customError";

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof customError) {
        res.status(error.statusCode).json(error.serialize());
    };
    res.status(500).json({ message: "An error occured"});
};
