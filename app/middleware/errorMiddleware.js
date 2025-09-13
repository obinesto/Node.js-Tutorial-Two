/**
 * Middleware to handle requests for routes that do not exist.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Centralized error handling middleware.
 */
export const errorHandler = (err, req, res, next) => {
  // If an error comes in with a 200 status code, default to 500.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose-specific error for malformed ObjectIDs
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    // Only show the stack trace in development mode for security reasons.
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
