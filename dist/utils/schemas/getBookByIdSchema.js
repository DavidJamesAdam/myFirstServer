"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookByIdSchema = void 0;
const express_validator_1 = require("express-validator");
exports.bookByIdSchema = (0, express_validator_1.checkSchema)({
    id: {
        in: ['params'],
        isInt: {
            errorMessage: "Parameter 'id' must be integer"
        }
    }
});
