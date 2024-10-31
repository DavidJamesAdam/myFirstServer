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
exports.getBookByIdHandler = getBookByIdHandler;
const data_1 = require("../utils/data");
function getBookByIdHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = parseInt(req.params.id);
        const book = data_1.books.find(b => b.id === bookId);
        try {
            if (book) {
                res.json(book);
            }
            else {
                throw new Error('book not found');
            }
        }
        catch (err) {
            // next(new getBooksError(bookId));
            res.status(404).json({ error: `${err}` });
            console.log(err);
        }
    });
}
