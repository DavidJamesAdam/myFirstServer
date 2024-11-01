import { Request, Response, NextFunction } from "express";
import { putBooksError } from "../errors/putBooksError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const bookData = req.body;

    try{
        const bookUpdate = await prisma.books.update({ where: { id: Number(id) }, data: bookData });
        
        if (bookUpdate) {
            res.json(bookUpdate);
        } else {
            throw new Error( "book not found" );
        }
    } catch(err) {
        // next(new putBooksError());
        res.status(404).json({ error: `${err}`})
    }
}
