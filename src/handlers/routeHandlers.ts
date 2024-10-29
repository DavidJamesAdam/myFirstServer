import { Request, Response, NextFunction } from "express";

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
        res.json(books);
};
