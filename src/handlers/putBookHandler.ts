// TODO: need to handle improper path variable
// - If ID doesn't exist
// - Schema validation
// - If neither ititle nor field exist in body

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";

const prisma = new PrismaClient();

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { title, author } = req.body;
    const error = validationResult(req);
    const updateData: {title?: string; author?: string} = {};

    try { 
        if (title) updateData.title = title;
        if (author) updateData.author = author;

        const uniqueId = await prisma.books.findUnique({
            where: { 
                id: Number(id) 
            }
        });

        if(!uniqueId){
            throw new NotFoundError({ code: 404, message: JSON.stringify(error.array().map(error => error.msg)) });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError({ code: 400, message: "title or author field required" });
        }
        if (!error.isEmpty()) {
            throw new BadRequestError({ code: 400, message: JSON.stringify(error.array().map(error => error.msg)) });
        } else {
            const alreadyExists = await prisma.books.findFirst({
                where: {title: title}
            });
            if(alreadyExists) {
                throw new BadRequestError({ code: 400, message: "title already exists" });
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
