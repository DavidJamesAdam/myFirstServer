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
exports.deleteBookHandler = deleteBookHandler;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
                throw new Error("book not found");
            }
        }
        catch (err) {
            // next(new deleteBooksError);
            res.status(404).json({ error: `${err}` });
        }
    });
}
