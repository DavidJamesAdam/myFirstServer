import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        
    if(err instanceof CustomError) {
        const { statusCode, errors } = err;
        res.status(statusCode).send({ errors });
    }
    
    console.error(JSON.stringify(err, null, 2));
    res.status(500).send({ errors: [{ message: "Internal Server Error" }] });
};
