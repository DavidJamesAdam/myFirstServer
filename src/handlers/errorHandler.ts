import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { customError } from "../utils/customError";

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
        res.status(res.statusCode || 500).json({ message: error.message });
};
