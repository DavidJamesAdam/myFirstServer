import { Request, Response, NextFunction } from "express";
import { books } from '../utils/data';

export async function getBooksHandler (req: Request, res: Response, next: NextFunction) {
    try {
        res.json(books);
    } catch(err) {
        next(err);
    }
};
