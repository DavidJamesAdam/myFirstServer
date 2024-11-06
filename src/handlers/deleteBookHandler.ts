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
            // Checking if ID not found
            if (err.code === "P2025") {
                const cause = err.meta?.cause;
                res.status(404).json({ error: cause });
            }
        } else if (err instanceof PrismaClientValidationError) {
            // Checking for path errors or if the id is missing in path
            res.status(400).json({ error: "Argument `id` is missing."});

        }  
    }
}
