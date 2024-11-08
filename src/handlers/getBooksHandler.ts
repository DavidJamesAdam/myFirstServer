// All positive test cases and error handling done

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../errors/notFoundError";

const prisma = new PrismaClient();

export async function getBooksHandler (req: Request, res: Response, next: NextFunction) {
    const bookTitle = req.query.title;
    const bookAuthor = req.query.author;

    try {
        if (typeof bookTitle === 'string') {
            const singleBook = await prisma.books.findFirst({
                where: { title: bookTitle },
            });
            if (!singleBook) {
                    throw new NotFoundError({ code: 404, message: "title not found" });
                } else {
                    res.json(singleBook);
                }
        } else if (typeof bookAuthor === 'string') {
            const booksByAuthor = await prisma.books.findMany({
                where: { author: bookAuthor },
            });

            if (!booksByAuthor.length) {
                throw new NotFoundError({ code: 404, message: "Author not found" });
            } else {
                res.json(booksByAuthor);
            }
        } else {
            const allBooks =  await prisma.books.findMany()
            res.json(allBooks);
        }
    } catch(err) {
        next(err);
    }
};
