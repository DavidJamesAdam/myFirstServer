// All positive test cases and error handling done

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { Result, validationResult } from "express-validator";
import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";

const prisma = new PrismaClient();

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { title, author } = req.body;
    const result: Result = validationResult(req);
    const updateData: {title?: string; author?: string} = {};

    if (title) updateData.title = title;
    if (author) updateData.author = author;

    try { 
        const uniqueId = await prisma.books.findUniqueOrThrow({
            where: { 
                id: Number(id) 
            }
        }).catch(() => {
            throw new NotFoundError({ 
                code: 404, 
                message: `book with ID: ${id} not found` 
            })
        });

        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError({ 
                code: 400, 
                message: "title or author field required" 
            });
        }

        if (!result.isEmpty()) {
            const error = result.array().map(error => error.msg).join(", ")
            throw new BadRequestError({ 
                code: 400, 
                message: error
            });
        } else {
            const alreadyExists = await prisma.books.findFirst({
                where: {title: title}
            });
            if(alreadyExists) {
                throw new BadRequestError({ 
                    code: 400, 
                    message: "title already exists" 
                });
            } else {
                const bookUpdate = await prisma.books.update({ 
                    where: { 
                        id: Number(id) 
                        },
                        data: updateData 
                    });
                res.json({ message: "book successfully updated", bookUpdate });
            }
        } 
    } catch(err) {
        next(err);
    }
}
