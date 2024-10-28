"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const server = (0, express_1.default)();
const PORT = 3000;
server.use(express_1.default.json());
server.use("/api", bookRoutes_1.default);
server.get("/", (req, res) => {
    res.send("Server is running.");
});
// The error handler
server.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});
server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});
