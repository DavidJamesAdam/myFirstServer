import { Request, Response, NextFunction } from "express";
import { postBooksError } from "../errors/postBooksError";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    try {
        const error = validationResult(req);
        const { title, author } = req.body;

        console.log(error);

        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array().map(error => error.msg) });
            // throw new Error
        } else { 
            const book = await prisma.books.create(
                {
                    data: {
                        title,
                        author
                    }
                }
            )
            res.json({message: "Book successfully added", book});
        }
    } catch(err){
        // next(new postBooksError());
        
    }
}
