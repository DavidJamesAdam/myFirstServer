// All positive test cases and error handling done
// Maybe check to see if there are different ways to verify id parameter
// Create own get request type in Express

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../errors/notFoundError";

const prisma = new PrismaClient();

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
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
