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
const deleteBooksError_1 = require("../errors/deleteBooksError");
const data_1 = require("../utils/data");
function deleteBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = parseInt(req.params.id);
            const bookIndex = data_1.books.findIndex(b => b.id === bookId);
            if (bookIndex !== -1) {
                data_1.books.splice(bookIndex, 1);
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
