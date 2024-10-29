import express from "express";
import routes from "./routes/bookRoutes";

import { errorHandler } from "./handlers/errorHandler";
import { customError } from "./utils/customError";

const server = express();
const PORT: number = 3000;

server.use(express.json());
server.use("/api", routes);

// The error handler
server.use(errorHandler);

server.get("/", (req, res) => {
    res.send("Server is running.");
})

// Catch all error handler for all routes not defined
// This can be a message, webpage, json, etc
server.all('*', () => {
    throw new Error();
});

server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});
