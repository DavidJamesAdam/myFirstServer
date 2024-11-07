"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksError = getBooksError;
function getBooksError(err, res, next) {
    // if (err instanceof PrismaClientKnownRequestError) {
    //     // No books found error
    //     res.status(404).json({ error: err.message });
    // } else {
    //     res.status(404).json({ error: "Author not found"})
    // }
    next(err);
}
