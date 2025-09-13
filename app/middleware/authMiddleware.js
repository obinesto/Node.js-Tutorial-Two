import jwt from "jsonwebtoken";
import Student from "../models/student.js";

/**
 * Middleware to protect routes that require authentication.
 * It verifies the JWT from the Authorization header and also look for user roles.
 */

export const protect = async (req, res, next) => {
  let token;

  // Check for the token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the database using the ID from the token
      // and attach it to the request object. We exclude the password.
      req.user = await Student.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * Middleware to check if the authenticated user is an admin.
 * This should be used after the 'protect' middleware.
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // proceed to the route handler
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
