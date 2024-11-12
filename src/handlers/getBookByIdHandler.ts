// All positive test cases and error handling done
// Maybe check to see if there are different ways to verify id parameter
// Create own get request type in Express

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../errors/notFoundError";
import { Result, validationResult } from "express-validator";

const prisma = new PrismaClient();

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result: Result = validationResult(req);

    try {
        if (!result.isEmpty()) {
            console.log(result);
            const error = result.array().map(error => error.msg).join(", ");
            throw new NotFoundError({ 
                code: 404, 
                message: error
            });
        }

        const book = await prisma.books.findUniqueOrThrow({
            where: { 
                id: Number(id) 
            },
        }).catch(() => 
            {
                throw new NotFoundError({ 
                    code: 404, 
                    message: `book with ID: ${id} not found`
                })
            });
        res.json(book);
    } catch(err) {
        next(err);
    }
}
