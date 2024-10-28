import express, { Request, Response, NextFunction } from "express";
import bookRoutes from "./routes/bookRoutes";

const server = express();
const PORT: number = 3000;

server.use(express.json());
server.use("/api", bookRoutes);

server.get("/", (req, res) => {
    res.send("Server is running.");
})


// The error handler
server.use((err: express.ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('Something broke!');
})

server.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});
