"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const errorHandler_1 = require("./handlers/errorHandler");
const server = (0, express_1.default)();
const PORT = 3000;
server.use(express_1.default.json());
server.use("/", routes_1.default);
// The error handler
server.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(err, req, res, next);
});
server.all("*", function (req, res) {
    res.status(404).json({ error: "route not found" });
});
server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on port ${PORT}.`);
});
