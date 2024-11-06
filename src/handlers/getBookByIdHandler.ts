import { Request, Response, NextFunction } from "express";
import { getBooksError } from "../errors/getBooksError";
import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const book = await prisma.books.findUnique({
            where: { id: Number(id) },
        })
        if (book) {
          res.json(book);
        } else {
            throw new Error(`book with ID: ${id} not found`);
        }
    } catch(err) {
        // next(new getBooksError(bookId));
        if (err instanceof PrismaClientValidationError) {
            res.status(400).json({ error: "Argument `id` is missing."});
        } else {
            res.status(404).json({ error: `${err}`});
        }
    }
}
