// All positive test cases and error handling done

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../errors/notFoundError";

const prisma = new PrismaClient();

export async function deleteBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const book = await prisma.books.delete({ 
            where: 
            {id: Number(id)}}).catch(() => {
                throw new NotFoundError({ 
                    code: 404, 
                    message: `book with ID: ${id} not found`
                })
            });
        res.status(204).send();
    } catch(err) {
        next(err);  
    }
}
