// All positive test cases and error handling done

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { Result, validationResult } from "express-validator";
import BadRequestError from "../errors/badRequestError";

const prisma = new PrismaClient();

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    try {
        const result: Result = validationResult(req);
        const { title, author } = req.body;

        if (!result.isEmpty()) {
            const error = result.array().map(error => error.msg).join(", ");
            throw new BadRequestError({ code: 400, message: error});
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
        // console.log(err);
        next(err);
    }
}
