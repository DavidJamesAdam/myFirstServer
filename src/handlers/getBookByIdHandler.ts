import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import BadRequestError from "../errors/badRequestError";

const prisma = new PrismaClient();

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
        const book = await prisma.books.findUnique({
            where: { id: Number(id) },
        })
        if (book) {
          res.json(book);
        } else {
            throw new BadRequestError({code: 400, message: `book with ID: ${id} not found`});
        }
    } catch(err) {
        next(err);
    }
}
