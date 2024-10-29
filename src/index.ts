import express from "express";
import bookRoutes from "./routes/bookRoutes";

import { errorHandler } from "./utils/errorHandler";

const server = express();
const PORT: number = 3000;

server.use(express.json());
server.use("/", bookRoutes);

// Catch all error handler for all routes not defined
// This can be a message, webpage, json, etc
server.all('*', (req, res) => {
    res.status(500).json({ message: 'An error has occcured'})
});

// The error handler
server.use(errorHandler);

server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});
