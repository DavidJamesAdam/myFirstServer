import { Request, Response, NextFunction } from "express";
import { getBooksError } from "../errors/getBooksError";
import { books } from "../utils/data";

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    try {
        if (book) {
          res.json(book);
        } else {
            throw new Error('book not found');
        }
    } catch(err) {
        // next(new getBooksError(bookId));
        res.status(404).json({ error: `${err}`});
        console.log(err);
    }
}
