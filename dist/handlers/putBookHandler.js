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
        const id = req.params.id;
        const { title, author } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        const updateData = {};
        try {
            if (title)
                updateData.title = title;
            if (author)
                updateData.author = author;
            const uniqueId = yield prisma.books.findUniqueOrThrow({
                where: {
                    id: Number(id)
                }
            });
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("title or author field required");
            }
            if (!error.isEmpty()) {
                throw new Error();
            }
            else {
                const alreadyExists = yield prisma.books.findFirst({
                    where: { title: title }
                });
                if (alreadyExists) {
                    console.log("nope");
                    throw new Error("title already exists");
                }
                else {
                    const bookUpdate = yield prisma.books.update({
                        where: {
                            id: Number(id)
                        },
                        data: updateData
                    });
                    res.json({ message: "book successfully updated", bookUpdate });
                }
            }
        }
        catch (err) {
            console.log(err);
            if (err instanceof library_1.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    // ID not found error
                    res.status(404).json({ error: err.message });
                }
            }
            else if (err instanceof library_1.PrismaClientValidationError) {
                // Checking for path errors or if the id is missing in path
                res.status(400).json({ error: "Argument `id` is missing." });
            }
            else if (!error.isEmpty()) {
                // Checking for schema validation errors
                res.status(400).json({ error: error.array().map(error => error.msg) });
            }
            else if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            }
            else {
                next();
            }
        }
    });
}
