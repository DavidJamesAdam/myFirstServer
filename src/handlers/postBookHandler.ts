import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import BadRequestError from "../errors/badRequestError";
// import { postBooksError } from "../errors/postBooksError";

const prisma = new PrismaClient();

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    const { title, author } = req.body;
    
    try {
        if (!error.isEmpty()) {
            throw new BadRequestError({ code: 400, message: JSON.stringify(error.array().map(error => error.msg))});
        } else { 
            const alreadyExists = await prisma.books.findFirst({
                where: {title: title}
            });
            if(alreadyExists) {
                throw new BadRequestError({ code: 400, message: "title already exists"});
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
        }
    } catch(err){
        next(err);
    }
}
