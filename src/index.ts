import express, { NextFunction } from "express";
import routes from "./routes/bookRoutes";

import { errorHandler } from "./handlers/errorHandler";

const server = express();
const PORT: number = 3000;

server.use(express.json());
server.use("/", routes);

// The error handler
server.use(errorHandler);

// Catch all error handler for all routes not defined
// This can be a message, webpage, json, etc
server.all('*', () => {
    throw new Error();
    // res.status(500).json({ message: "An error has occured."});
});

server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on port ${PORT}.`);
});
