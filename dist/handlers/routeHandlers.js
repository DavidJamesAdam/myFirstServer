"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksHandler = getBooksHandler;
exports.getBookByIdHandler = getBookByIdHandler;
exports.postBookHandler = postBookHandler;
exports.putBookHandler = putBookHandler;
exports.deleteBookHandler = deleteBookHandler;
const getBooksError_1 = require("../errors/getBooksError");
const postBooksError_1 = require("../errors/postBooksError");
const putBooksError_1 = require("../errors/putBooksError");
const deleteBooksError_1 = require("../errors/deleteBooksError");
;
const books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" }
];
function getBooksHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(books);
        }
        catch (err) {
            next(err);
        }
    });
}
;
function getBookByIdHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = parseInt(req.params.id);
        const book = books.find(b => b.id === bookId);
        try {
            if (book) {
                res.json(book);
            }
            else {
                res.status(404).json({ message: "Book not found" });
            }
        }
        catch (err) {
            next(new getBooksError_1.getBooksError(bookId));
            // res.status(404).json({ error: "book not found"})
        }
    });
}
function postBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newBook = {
                id: books.length + 1,
                title: req.body.title,
                author: req.body.author
            };
            books.push(newBook);
            res.status(201).json({ message: "book successfully added", newBook });
        }
        catch (err) {
            next(new postBooksError_1.postBooksError());
        }
    });
}
function putBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
        }
        catch (err) {
            next(new putBooksError_1.putBooksError());
        }
    });
}
function deleteBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = parseInt(req.params.id);
            const bookIndex = books.findIndex(b => b.id === bookId);
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
                res.status(204).json({ message: `${bookId} has been deleted` });
            }
            else {
                res.status(404).json({ message: "Book not found" });
            }
        }
        catch (err) {
            next(new deleteBooksError_1.deleteBooksError);
        }
    });
}
