import { Router, Request, Response } from "express";

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
router.get("/books", (req: Request, res: Response) => {
    res.json(books);
});

// Get a book by ID
router.get("/books/:id", (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b=> b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Create a new book
router.post("/books", (req: Request, res: Response) => {
    const newBook: Book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    if (newBook.title == "" && newBook.author == "") {
        res.status(400).json({ message: "title and author required"})
    } else if (newBook.title == "") {
        res.status(400).json({ message: "title required"})
    } else if (newBook.author == "") {
        res.status(400).json({ message: "author required"})
    } else {
        books.push(newBook);
        res.status(201).json(newBook);
    }
});

// Update a book by ID
router.put("/books/:id", (req: Request, res: Response) => {
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
});

// Delete a book by id
router.delete("/books/:id", (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send().json({ message: `${bookId} has been deleted`});
    } else {
        res.status(404).json({ message: "Book not found"})
    }
});

export default router;
