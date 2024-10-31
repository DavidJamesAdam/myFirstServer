import { Request, Response, NextFunction } from "express";
import { deleteBooksError } from "../errors/deleteBooksError";
import { books } from "../utils/data";

export async function deleteBookHandler (req: Request, res: Response, next: NextFunction) {
    try{
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);

        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
            res.status(204).json({ message: `${bookId} has been deleted`});
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch(err) {
        next(new deleteBooksError);
    }
}
