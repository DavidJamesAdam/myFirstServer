import { Request, Response, NextFunction } from "express";
import { putBooksError } from "../errors/putBooksError";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError, skip } from "@prisma/client/runtime/library";
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
        const bookUpdate = await prisma.books.update({ where: { id: Number(id) }, data: updateData });

        if (bookUpdate.id) {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("title or author field required");
            }
            if(!error.isEmpty()) {
                throw new Error();
            } else {
                res.json(bookUpdate);
            } //TODO: Check for existing title. Updated title must be unique
        } else {
            throw new Error();
        }
    } catch(err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                // ID not found error
                const cause = err.meta?.cause;
                res.status(404).json({ error: cause });
            }
        } else if (err instanceof PrismaClientValidationError) {
            // Checking for path errors or if the id is missing in path
            res.status(400).json({ error: "Argument `id` is missing."});
        } else {
            // Checking for validation errors
            res.status(400).json({ error: error.array().map(error => error.msg) });
        }
    }
}
