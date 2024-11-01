"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const express_validator_1 = require("express-validator");
exports.bookSchema = (0, express_validator_1.checkSchema)({
    title: {
        in: ['body'],
        isString: true,
        errorMessage: 'Title should be a string',
        notEmpty: true,
    },
    author: {
        in: ['body'],
        isString: true,
        errorMessage: 'Author should be a string',
        notEmpty: true,
    },
});
