import { Request, Response, NextFunction } from "express";
import { getBooksError } from "../errors/getBooksError";


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
    return res.json(books);
};

export async function getBookByIdHandler (req: Request, res: Response, next: NextFunction) {
    const bookId = parseInt(req.params.id);
    const book = books.find(b=> b.id === bookId);
    return book;
}

export async function postBookHandler (req: Request, res: Response, next: NextFunction) {
    const newBook: Book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json({ message: "book successfully added", newBook });
}

export async function putBookHandler (req: Request, res: Response, next: NextFunction) {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId,
            title: req.body.title,
            author: req.body.author
        };
    }
}

export async function deleteBookHandler (req: Request, res: Response, next: NextFunction) {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send().json({ message: `${bookId} has been deleted`});
    }
}
