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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksHandler = getBooksHandler;
const client_1 = require("@prisma/client");
const notFoundError_1 = __importDefault(require("../errors/notFoundError"));
const prisma = new client_1.PrismaClient();
function getBooksHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookTitle = req.query.title;
        const bookAuthor = req.query.author;
        try {
            if (typeof bookTitle === 'string') {
                const singleBook = yield prisma.books.findFirst({
                    where: { title: bookTitle },
                });
                if (!singleBook) {
                    throw new notFoundError_1.default({ code: 404, message: "title not found" });
                }
                else {
                    res.json(singleBook);
                }
            }
            else if (typeof bookAuthor === 'string') {
                const booksByAuthor = yield prisma.books.findMany({
                    where: { author: bookAuthor },
                });
                if (!booksByAuthor.length) {
                    throw new notFoundError_1.default({ code: 404, message: "Author not found" });
                }
                else {
                    res.json(booksByAuthor);
                }
            }
            else {
                const allBooks = yield prisma.books.findMany();
                res.json(allBooks);
            }
        }
        catch (err) {
            next(err);
        }
    });
}
;
