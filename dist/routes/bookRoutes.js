"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeHandlers_1 = require("../handlers/routeHandlers");
const router = (0, express_1.Router)();
router.route("/books")
    .get(routeHandlers_1.getBooksHandler)
    .post(routeHandlers_1.postBookHandler);
router.route("/books/:id")
    .get(routeHandlers_1.getBookByIdHandler)
    .put(routeHandlers_1.putBookHandler)
    .delete(routeHandlers_1.deleteBookHandler);
exports.default = router;
