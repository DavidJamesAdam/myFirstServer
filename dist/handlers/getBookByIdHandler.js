"use strict";
// All positive test cases and error handling done
// Maybe check to see if there are different ways to verify id parameter
// Create own get request type in Express
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
exports.getBookByIdHandler = getBookByIdHandler;
const client_1 = require("@prisma/client");
const notFoundError_1 = __importDefault(require("../errors/notFoundError"));
const express_validator_1 = require("express-validator");
const prisma = new client_1.PrismaClient();
function getBookByIdHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const result = (0, express_validator_1.validationResult)(req);
        try {
            if (!result.isEmpty()) {
                console.log(result);
                const error = result.array().map(error => error.msg).join(", ");
                throw new notFoundError_1.default({
                    code: 404,
                    message: error
                });
            }
            const book = yield prisma.books.findUniqueOrThrow({
                where: {
                    id: Number(id)
                },
            }).catch(() => {
                throw new notFoundError_1.default({
                    code: 404,
                    message: `book with ID: ${id} not found`
                });
            });
            res.json(book);
        }
        catch (err) {
            next(err);
        }
    });
}
