"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const server = (0, express_1.default)();
const PORT = 3000;
server.use(express_1.default.json());
server.use("/", routes_1.default);
// The error handler
// server.use(errorHandler);
// Catch all error handler for all routes not defined
// This can be a message, webpage, json, etc
server.all('*', (req, res) => {
    // throw new Error();
    res.status(500).json({ message: "An error has occured." });
});
server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on port ${PORT}.`);
});
