"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteBookHandler_1 = require("../handlers/deleteBookHandler");
const getBookByIdHandler_1 = require("../handlers/getBookByIdHandler");
const getBooksHandler_1 = require("../handlers/getBooksHandler");
const postBookHandler_1 = require("../handlers/postBookHandler");
const putBookHandler_1 = require("../handlers/putBookHandler");
const postBookSchema_1 = require("../utils/schemas/postBookSchema");
const router = (0, express_1.Router)();
router.route("/books")
    .get(getBooksHandler_1.getBooksHandler)
    .post(postBookSchema_1.bookSchema, postBookHandler_1.postBookHandler);
router.route("/books/:id")
    .get(getBookByIdHandler_1.getBookByIdHandler)
    .put(postBookSchema_1.bookSchema, putBookHandler_1.putBookHandler)
    .delete(deleteBookHandler_1.deleteBookHandler);
exports.default = router;
