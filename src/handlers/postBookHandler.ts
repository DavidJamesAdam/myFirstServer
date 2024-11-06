import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    const { title, author } = req.body;
    
    try {
        if (!error.isEmpty()) {
            throw new Error();
        } else { 
            const alreadyExists = await prisma.books.findFirst({
                where: {title: title}
            });
            if(alreadyExists) {
                throw new Error()
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
        if(!error.isEmpty()){
            res.status(400).json({ error: error.array().map(error => error.msg) });
        } else {
            res.status(400).json({ error: "title already exists" });
        }
    }
}
