import { Request, Response, NextFunction } from "express";
import { getBooksError } from "../errors/getBooksError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params;
    const book = await prisma.books.findUnique({
        where: { id: Number(id) },
    })
    try {
        if (book) {
          res.json(book);
        } else {
            throw new Error('book not found');
        }
    } catch(err) {
        // next(new getBooksError(bookId));
        res.status(404).json({ error: `${err}`});
    }
}
