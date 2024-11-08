// TODO: Need to adjust how imporper path is handled

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../errors/notFoundError";

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
            throw new NotFoundError({code: 404, message: `book with ID: ${id} not found`});
        }
    } catch(err) {
        next(err);
    }
}
