import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({ message: error.message });
};
