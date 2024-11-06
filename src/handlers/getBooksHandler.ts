import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function getBooksHandler (req: Request, res: Response, next: NextFunction) {
    const bookTitle = req.query.title;
    const bookAuthor = req.query.author;

    try {
        if (typeof bookTitle === 'string') {
            const singleBook = await prisma.books.findFirstOrThrow({
                where: { title: bookTitle },
            });
            res.json(singleBook);
        } else if (typeof bookAuthor === 'string') {
            const booksByAuthor = await prisma.books.findMany({
                where: { author: bookAuthor },
            });

            if (!booksByAuthor.length) {
                throw new Error();
            } else {
                res.json(booksByAuthor);
            }
        } else {
            const allBooks =  await prisma.books.findMany()
            res.json(allBooks);
        }
    } catch(err) {
        console.log(err);
        if (err instanceof PrismaClientKnownRequestError) {
                // No books found error
                res.status(404).json({ error: err.message });
            } else {
                res.status(404).json({ error: "Author not found"})
            }
        next(err);
    }
};
