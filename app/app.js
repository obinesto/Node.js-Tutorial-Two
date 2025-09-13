import express from "express";
import { log } from "console";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { studentsRoute } from "./routes/studentsRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Create an instance of an Express application. The 'app' object has methods for routing HTTP requests,
// configuring middleware, rendering HTML views, and registering a template engine.
const app = express();

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// Execute the config method on dotenv. This will read your .env file, parse the contents,
// assign it to process.env, and return an object with a parsed key containing the loaded content
// or an error key if it failed.
dotenv.config();

// Connect to the database
connectDB();

const port = process.env.PORT || 3000;

// Routes
// All routes defined in studentsRoute will be prefixed with /api/students.
app.use("/api/students", studentsRoute);

// Custom error handling middleware.
app.use(notFound);
app.use(errorHandler);

export default function App() {
  // Start the server and have it listen on the specified 'port' for incoming connections.
  app.listen(port, () => log(`Server running on http://localhost:${port}`));
}
