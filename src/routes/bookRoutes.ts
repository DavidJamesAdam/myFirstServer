import { Router, Request, Response, NextFunction } from "express";
import { getBooksHandler } from "../handlers/routeHandlers";
import { getBooksError } from "../errors/getBooksError";
import { postBooksError } from "../errors/postBooksError";
import { putBooksError } from "../errors/putBooksError";
import { deleteBooksError } from "../errors/deleteBooksError";

const router = Router();

interface Book {
    id: number;
    title: string;
    author: string;
};

const books: Book[] = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" }
  ];

// Get all books
router.get("/books", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getBooksHandler(req, res, next);
    } catch(err) {
        next();
    }
});

// Get a book by ID
router.get("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
    const bookId = parseInt(req.params.id);
    const book = books.find(b=> b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
} catch(err) {
    next(new getBooksError());
}
});

// Create a new book
router.post("/books", async (req: Request, res: Response, next: NextFunction) => {
    try {const newBook: Book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    if (!req.body.title && !req.body.author) {
        res.status(400).json({ message: "title and author required"})
    } else if (!req.body.title) {
        res.status(400).json({ message: "title required"})
    } else if (!req.body.author) {
        res.status(400).json({ message: "author required"})
    } else {
        books.push(newBook);
        res.status(201).json({ message: "book successfully added", newBook });
    }} catch(err){
        next(new postBooksError());
    }
});

// Update a book by ID
router.put("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId,
            title: req.body.title,
            author: req.body.author
        };
    } else {
        res.status(404).json({ message: "Book not found" });
    }} catch(err) {
        next(new putBooksError());
    }
});

// Delete a book by id
router.delete("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send().json({ message: `${bookId} has been deleted`});
    } else {
        res.status(404).json({ message: "Book not found"})
    }} catch(err) {
        next(new deleteBooksError);
    }
});

export default router;
