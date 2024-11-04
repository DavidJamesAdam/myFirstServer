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
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
function deleteBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = req.params.id;
        try {
            const book = yield prisma.books.delete({ where: { id: Number(id) } });
            if (book) {
                res.status(204).json({ message: `${id} has been deleted` });
            }
            else {
                throw new Error();
            }
        }
        catch (err) {
            // next(new deleteBooksError);
            if (err instanceof library_1.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    const cause = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.cause;
                    res.status(404).json({ error: cause });
                }
            }
            else if (err instanceof library_1.PrismaClientValidationError) {
                if (err.message.includes("Argument `id` is missing.")) {
                    res.status(400).json({ error: "Argument `id` is missing." });
                }
                else {
                    res.status(400).json({ error: "Invalid request" });
                }
            }
        }
    });
}
