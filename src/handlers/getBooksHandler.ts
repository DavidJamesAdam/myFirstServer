import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBooksHandler (req: Request, res: Response, next: NextFunction) {
    const book =  await prisma.books.findMany()
    try {
        res.json(book);
    } catch(err) {
        next(err);
    }
};
