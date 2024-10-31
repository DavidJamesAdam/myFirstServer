import { Request, Response, NextFunction } from "express";
import { putBooksError } from "../errors/putBooksError";
import { books } from "../utils/data";

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    try{
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        
        if (bookIndex !== -1) {
            books[bookIndex] = {
                id: bookId,
                title: req.body.title,
                author: req.body.author
            };
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch(err) {
        next(new putBooksError());
    }
}
