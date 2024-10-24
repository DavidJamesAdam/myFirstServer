"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
;
const books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" }
];
// Get all books
router.get("/books", (req, res) => {
    res.json(books);
});
// Get a book by ID
router.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).json({ message: "Book not found" });
    }
});
// Create a new book
router.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    if (!req.body.title && !req.body.author) {
        res.status(400).json({ message: "title and author required" });
    }
    else if (!req.body.title) {
        res.status(400).json({ message: "title required" });
    }
    else if (!req.body.author) {
        res.status(400).json({ message: "author required" });
    }
    else {
        books.push(newBook);
        res.status(201).json({ message: "book successfully added", newBook });
    }
});
// Update a book by ID
router.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId,
            title: req.body.title,
            author: req.body.author
        };
    }
    else {
        res.status(404).json({ message: "Book not found" });
    }
});
// Delete a book by id
router.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send().json({ message: `${bookId} has been deleted` });
    }
    else {
        res.status(404).json({ message: "Book not found" });
    }
});
exports.default = router;
