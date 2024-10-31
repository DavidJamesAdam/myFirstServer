import { Request, Response, NextFunction } from "express";
import { postBooksError } from "../errors/postBooksError";
import { Book, books } from "../utils/data";

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    try {
        const newBook: Book = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author
        };
    
        books.push(newBook);
        res.status(201).json({ message: "book successfully added", newBook });
    } catch(err){
        next(new postBooksError());
    }
}
