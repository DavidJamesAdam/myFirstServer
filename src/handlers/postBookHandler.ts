import { Request, Response, NextFunction } from "express";
import { postBooksError } from "../errors/postBooksError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    try {
        const { title, author } = req.body;
        const book = await prisma.books.create({
            data: {
                title,
                author
            }
        })

        res.json({message: "Book successfully added", book});
    } catch(err){
        next(new postBooksError());
    }
}
