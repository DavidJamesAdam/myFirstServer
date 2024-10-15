// Import the 'express' module along with 'Request' and 'Response' types from express
import express from 'express';
import bookRoutes from "./routes/bookRoutes";

// Create an Express application
const app = express();

// Set the port number for the server
const port: number = 3000;

app.use(express.json());
app.use("api", bookRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message whne the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
