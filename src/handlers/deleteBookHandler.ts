import { Request, Response, NextFunction } from "express";
import { deleteBooksError } from "../errors/deleteBooksError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const book = await prisma.books.delete({ where: {id: Number(id)}})
    
    try {
        if (book) {
            res.status(204).json({ message: `${id} has been deleted`});
        } else if (!book) {
            throw new Error("book not found" );
        }
    } catch(err) {
        // next(new deleteBooksError);
        res.status(404).json({ error: `${err}`})
    }
}
