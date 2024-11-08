"use strict";
// TODO: Need to adjust how schema validation is handled in error (empty string, if field is an integer, etc)
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
exports.postBookHandler = postBookHandler;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const badRequestError_1 = __importDefault(require("../errors/badRequestError"));
// import { postBooksError } from "../errors/postBooksError";
const prisma = new client_1.PrismaClient();
function postBookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = (0, express_validator_1.validationResult)(req);
        const { title, author } = req.body;
        try {
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
                    const book = yield prisma.books.create({
                        data: {
                            title,
                            author
                        }
                    });
                    res.json({ message: "Book successfully added", book });
                }
            }
        }
        catch (err) {
            next(err);
        }
    });
}
