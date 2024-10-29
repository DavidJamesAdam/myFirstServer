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
const express_1 = require("express");
const routeHandlers_1 = require("../handlers/routeHandlers");
const postBooksError_1 = require("../errors/postBooksError");
const putBooksError_1 = require("../errors/putBooksError");
const deleteBooksError_1 = require("../errors/deleteBooksError");
const router = (0, express_1.Router)();
// Get all books
router.get("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, routeHandlers_1.getBooksHandler)(req, res, next);
    }
    catch (err) {
        next(err);
    }
}));
// Get a book by ID
router.get("/books/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, routeHandlers_1.getBookByIdHandler)(req, res, next);
        res.json(result);
    }
    catch (err) {
        // next(new getBooksError());
        res.status(404).json({ error: "book not found" });
    }
}));
// Create a new book
router.post("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, routeHandlers_1.postBookHandler)(req, res, next);
    }
    catch (err) {
        next(new postBooksError_1.postBooksError());
    }
}));
// Update a book by ID
router.put("/books/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, routeHandlers_1.putBookHandler)(req, res, next);
    }
    catch (err) {
        next(new putBooksError_1.putBooksError());
    }
}));
// Delete a book by id
router.delete("/books/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, routeHandlers_1.deleteBookHandler)(req, res, next);
    }
    catch (err) {
        next(new deleteBooksError_1.deleteBooksError);
    }
}));
exports.default = router;
