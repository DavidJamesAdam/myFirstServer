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
;
const books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" }
];
function getBooksHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json(books);
    });
}
;
function getBookByIdHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = parseInt(req.params.id);
        const book = books.find(b => b.id === bookId);
        return book;
    });
}
function postBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBook = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author
        };
        books.push(newBook);
        res.status(201).json({ message: "book successfully added", newBook });
    });
}
function putBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        if (bookIndex !== -1) {
            books[bookIndex] = {
                id: bookId,
                title: req.body.title,
                author: req.body.author
            };
        }
    });
}
function deleteBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
            res.status(204).send().json({ message: `${bookId} has been deleted` });
        }
    });
}
