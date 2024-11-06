import {Request, Response, NextFunction } from "express";

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
        res.status(res.statusCode || 500).json({ error: error.message });
};
