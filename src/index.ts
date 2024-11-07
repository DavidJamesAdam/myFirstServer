import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/routes";

import { errorHandler } from "./handlers/errorHandler";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const server = express();
const PORT: number = 3000;

server.use(express.json());
server.use("/", routes);

// The error handler
server.use(errorHandler);

server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on port ${PORT}.`);
});
