"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bookSchema = (0, express_validator_1.checkSchema)({
    id: {
        in: ['query']
    }
});
