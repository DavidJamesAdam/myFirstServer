import { Request, Response, NextFunction } from "express";
import { putBooksError } from "../errors/putBooksError";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { title, author } = req.body;
    const error = validationResult(req);

    try {
        const bookUpdate = await prisma.books.update({ where: { id: Number(id) }, data: { title, author } });
        if (bookUpdate.id) {
            if(!error.isEmpty()) {
                throw new Error();
            } else {
                res.json(bookUpdate);
            } //TODO: Check for existing title. Updated title must be unique
        } else {
            throw new Error();
        }
    } catch(err) {
        // next(new putBooksError());
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                const cause = err.meta?.cause;
                res.status(404).json({ error: cause });
            }
        } else if (err instanceof PrismaClientValidationError) {
            if (err.message.includes("Argument `id` is missing.")) {
                res.status(400).json({ error: "Argument `id` is missing."});
            } else {
                res.status(400).json({ error: "Invalid request"});
            }
        } else {
            res.status(400).json({ error: error.array().map(error => error.msg) });
        }
    }
}
