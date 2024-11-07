import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function getBooksError (err: Error, res: Response, next: NextFunction) {
    // if (err instanceof PrismaClientKnownRequestError) {
    //     // No books found error
    //     res.status(404).json({ error: err.message });
    // } else {
    //     res.status(404).json({ error: "Author not found"})
    // }
    next(err);
}
