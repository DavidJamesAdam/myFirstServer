import { Request, Response, NextFunction } from "express";
import { deleteBooksError } from "../errors/deleteBooksError";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function deleteBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const book = await prisma.books.delete({ where: {id: Number(id)}})
        if (book) {
            res.status(204).json({ message: `${id} has been deleted`});
        } else {
            throw new Error();
        }
    } catch(err) {
        // next(new deleteBooksError);
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
        }  
    }
}
