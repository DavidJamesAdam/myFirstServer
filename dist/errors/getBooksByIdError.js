"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByIdError = getBooksByIdError;
const library_1 = require("@prisma/client/runtime/library");
function getBooksByIdError(err, req, res, next) {
    if (err instanceof library_1.PrismaClientValidationError) {
        res.status(400).json({ error: "Argument `id` is missing." });
    }
    else {
        res.status(404).json({ error: `${err}` });
    }
}
