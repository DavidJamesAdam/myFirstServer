"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const errorHandler_1 = require("./handlers/errorHandler");
const server = (0, express_1.default)();
const PORT = 3000;
server.use(express_1.default.json());
server.use("/api", bookRoutes_1.default);
// The error handler
server.use(errorHandler_1.errorHandler);
server.get("/", (req, res) => {
    res.send("Server is running.");
});
// Catch all error handler for all routes not defined
// This can be a message, webpage, json, etc
server.all('*', (req, res) => {
    res.status(500).json({ message: 'An error has occcured' });
});
server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});
