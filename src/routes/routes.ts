import { Router } from "express";
import { deleteBookHandler } from '../handlers/deleteBookHandler';
import { getBookByIdHandler } from '../handlers/getBookByIdHandler';
import { getBooksHandler } from '../handlers/getBooksHandler';
import { postBookHandler } from "../handlers/postBookHandler";
import { putBookHandler } from "../handlers/putBookHandler";
import { bookSchema } from "../utils/schemas/postBookSchema";
import { putBookSchema } from "../utils/schemas/putBookSchema";
import { bookByIdSchema } from "../utils/schemas/getBookByIdSchema";
import { deleteBookSchema } from "../utils/schemas/deleteBookSchema";

const router = Router();

// /books/:bookId?
router.route("/books")
        .get(getBooksHandler)
        .post(bookSchema, postBookHandler);

router.route("/books/:id")
        .get(bookByIdSchema, getBookByIdHandler)
        .put(putBookSchema, putBookHandler)
        .delete(deleteBookSchema, deleteBookHandler);

export default router;
