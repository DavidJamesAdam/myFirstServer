"use strict";
// TODO: Need to adjust how imporper path is handled
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
const prisma = new client_1.PrismaClient();
function getBookByIdHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const book = yield prisma.books.findUnique({
                where: { id: Number(id) },
            });
            if (book) {
                res.json(book);
            }
            else {
                throw new notFoundError_1.default({ code: 404, message: `book with ID: ${id} not found` });
            }
        }
        catch (err) {
            next(err);
        }
    });
}
