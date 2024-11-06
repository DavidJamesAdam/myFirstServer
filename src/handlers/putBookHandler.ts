import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { title, author } = req.body;
    const error = validationResult(req);
    const updateData: {title?: string; author?: string} = {};

    try { 
        if (title) updateData.title = title;
        if (author) updateData.author = author;

        const uniqueId = await prisma.books.findUniqueOrThrow({
            where: { 
                id: Number(id) 
            }
        });

        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("title or author field required");
        }
        if (!error.isEmpty()) {
            throw new Error();
        } else {
            const alreadyExists = await prisma.books.findFirst({
                where: {title: title}
            });
            if(alreadyExists) {
                throw new Error("title already exists")
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
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                // ID not found error
                res.status(404).json({ error: err.message });
            }
        } else if (err instanceof PrismaClientValidationError) {
            // Checking for path errors or if the id is missing in path
            res.status(400).json({ error: "Argument `id` is missing."});
        } else if (!error.isEmpty()) {
            // Checking for schema validation errors
            res.status(400).json({ error: error.array().map(error => error.msg) });
        } else if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            next();
        }
    }
}
