"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module along with 'Request' and 'Response' types from express
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
// Create an Express application
const app = (0, express_1.default)();
// Set the port number for the server
const port = 3000;
app.use(express_1.default.json());
app.use("api", bookRoutes_1.default);
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message whne the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
