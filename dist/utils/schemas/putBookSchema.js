"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBookSchema = void 0;
const express_validator_1 = require("express-validator");
exports.putBookSchema = (0, express_validator_1.checkSchema)({
    title: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Title should be a string',
        },
        notEmpty: {
            errorMessage: 'Title should not be empty',
        },
    },
    author: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Author should be a string',
        },
        notEmpty: {
            errorMessage: 'Author should not be empty',
        },
    },
});
