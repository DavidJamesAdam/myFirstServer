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
exports.postBookHandler = postBookHandler;
const postBooksError_1 = require("../errors/postBooksError");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
