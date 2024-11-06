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
exports.putBookHandler = putBookHandler;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const express_validator_1 = require("express-validator");
const prisma = new client_1.PrismaClient();
function putBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = req.params.id;
        const { title, author } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        try {
            const bookUpdate = yield prisma.books.update({ where: { id: Number(id) }, data: { title, author } });
            if (bookUpdate.id) {
                if (!error.isEmpty()) {
                    throw new Error();
                }
                else {
                    res.json(bookUpdate);
                } //TODO: Check for existing title. Updated title must be unique
            }
            else {
                throw new Error();
            }
        }
        catch (err) {
            // next(new putBooksError());
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
            else {
                res.status(400).json({ error: error.array().map(error => error.msg) });
            }
        }
    });
}
