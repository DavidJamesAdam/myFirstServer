import { Request, Response, NextFunction } from "express";
import { deleteBooksError } from "../errors/deleteBooksError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteBookHandler (req: Request, res: Response, next: NextFunction) {
    try{
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
            res.status(204).json({ message: `${bookId} has been deleted`});
        } else {
            throw new Error("book not found" );
        }
    } catch(err) {
        // next(new deleteBooksError);
        res.status(404).json({ error: `${err}`})
    }
}
