import { Router } from "express";
import { deleteBookHandler } from '../handlers/deleteBookHandler';
import { getBookByIdHandler } from '../handlers/getBookByIdHandler';
import { getBooksHandler } from '../handlers/getBooksHandler';
import { postBookHandler } from "../handlers/postBookHandler";
import { putBookHandler } from "../handlers/putBookHandler";
import { bookSchema } from "../utils/schemas/postBookSchema";
import { bookByIdSchema } from "../utils/schemas/getBookByIdSchema";

const router = Router();

router.route("/books")
        .get(getBooksHandler)
        .post(bookSchema, postBookHandler);

router.route("/books/:id")
        .get(getBookByIdHandler)
        .put(putBookHandler)
        .delete(deleteBookHandler);

export default router;
