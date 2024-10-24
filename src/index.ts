import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use("/api", bookRoutes);


// The error handler
app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {

})

app.listen(PORT, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${PORT}`);
});
