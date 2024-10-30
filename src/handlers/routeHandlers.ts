import { Request, Response, NextFunction } from "express";
import { getBooksError } from "../errors/getBooksError";
import { postBooksError } from "../errors/postBooksError";
import { putBooksError } from "../errors/putBooksError";
import { deleteBooksError } from "../errors/deleteBooksError";

interface Book {
    id: number;
    title: string;
    author: string;
};

const books: Book[] = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" }
  ];

export async function getBooksHandler (req: Request, res: Response, next: NextFunction) {
    try {
        res.json(books);
    } catch(err) {
        next(err);
    }
};

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    try {
        if (book) {
          res.json(book);
        } else {
          res.status(404).json({ message: "Book not found" });
        }
    } catch(err) {
        next(new getBooksError(bookId));
        // res.status(404).json({ error: "book not found"})
    }
}

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
