import { Router, Request, Response, NextFunction } from "express";
import { deleteBookHandler, getBookByIdHandler, getBooksHandler, postBookHandler, putBookHandler } from "../handlers/routeHandlers";
import { getBooksError } from "../errors/getBooksError";
import { postBooksError } from "../errors/postBooksError";
import { putBooksError } from "../errors/putBooksError";
import { deleteBooksError } from "../errors/deleteBooksError";

const router = Router();

// Get all books
router.get("/books", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getBooksHandler(req, res, next);
    } catch(err) {
        next(err);
    }
});

// Get a book by ID
router.get("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getBookByIdHandler(req, res, next);
        res.json(result)
    } catch(err) {
        // next(new getBooksError());
        res.status(404).json({ error: "book not found"})
    }
});

// Create a new book
router.post("/books", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await postBookHandler(req, res, next);
    } catch(err){
        next(new postBooksError());
    }
});

// Update a book by ID
router.put("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        await putBookHandler(req, res, next);
    } catch(err) {
        next(new putBooksError());
    }
});

// Delete a book by id
router.delete("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        await deleteBookHandler(req, res, next);
    } catch(err) {
        next(new deleteBooksError);
    }
});

export default router;
