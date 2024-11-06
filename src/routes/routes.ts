import { Router } from "express";
import { deleteBookHandler } from '../handlers/deleteBookHandler';
import { getBookByIdHandler } from '../handlers/getBookByIdHandler';
import { getBooksHandler } from '../handlers/getBooksHandler';
import { postBookHandler } from "../handlers/postBookHandler";
import { putBookHandler } from "../handlers/putBookHandler";
import { bookSchema } from "../utils/schemas/postBookSchema";
import { putBookSchema } from "../utils/schemas/putBookSchema";

const router = Router();

router.route("/books")
        .get(getBooksHandler)
        .post(bookSchema, postBookHandler);

router.route("/books/:id")
        .get(getBookByIdHandler)
        .put(putBookSchema, putBookHandler)
        .delete(deleteBookHandler);

export default router;
