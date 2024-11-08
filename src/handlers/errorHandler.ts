import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        
    if (err instanceof CustomError) {
        const { statusCode, errors } = err;
        return res.status(statusCode).send({ errors });
    } else if (err instanceof PrismaClientValidationError) {
        // Checking for path errors or if the id is missing in path
        return res.status(400).json({ error: "Argument `id` is missing."});
    } else if (err instanceof PrismaClientKnownRequestError) {
        const cause = err.meta?.cause;
        return res.status(404).json({ error: cause });
    }
    
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Internal Server Error" }] });
};
