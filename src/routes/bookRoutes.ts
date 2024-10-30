import { Router, Request, Response, NextFunction } from "express";
import { deleteBookHandler, getBookByIdHandler, getBooksHandler, postBookHandler, putBookHandler } from "../handlers/routeHandlers";

const router = Router();

router.route("/books")
        .get(getBooksHandler)
        .post(postBookHandler);

router.route("/books/:id")
        .get(getBookByIdHandler)
        .put(putBookHandler)
        .delete(deleteBookHandler);

export default router;
