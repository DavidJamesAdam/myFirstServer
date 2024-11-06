"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const express_validator_1 = require("express-validator");
exports.bookSchema = (0, express_validator_1.checkSchema)({
    title: {
        in: ['body'],
        exists: {
            bail: true,
            errorMessage: "Body must include 'title' field"
        },
        isString: {
            errorMessage: 'Title should be a string',
        },
        notEmpty: {
            errorMessage: 'Title should not be empty',
        },
    },
    author: {
        in: ['body'],
        exists: {
            bail: true,
            errorMessage: "Body must include 'author' field"
        },
        isString: {
            errorMessage: 'Author should be a string',
        },
        notEmpty: {
            errorMessage: 'Author should not be empty',
        },
    },
});
