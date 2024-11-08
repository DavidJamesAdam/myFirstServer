"use strict";
// TODO: need to handle improper path variable
// - If ID doesn't exist
// - Schema validation
// - If neither ititle nor field exist in body
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
exports.putBookHandler = putBookHandler;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const badRequestError_1 = __importDefault(require("../errors/badRequestError"));
const notFoundError_1 = __importDefault(require("../errors/notFoundError"));
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
            const uniqueId = yield prisma.books.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!uniqueId) {
                throw new notFoundError_1.default({ code: 404, message: JSON.stringify(error.array().map(error => error.msg)) });
            }
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new badRequestError_1.default({ code: 400, message: "title or author field required" });
            }
            if (!error.isEmpty()) {
                throw new badRequestError_1.default({ code: 400, message: JSON.stringify(error.array().map(error => error.msg)) });
            }
            else {
                const alreadyExists = yield prisma.books.findFirst({
                    where: { title: title }
                });
                if (alreadyExists) {
                    throw new badRequestError_1.default({ code: 400, message: "title already exists" });
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
            next(err);
        }
    });
}
