import { Router } from "express";
import {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/controller.js";
import { registerStudent, loginStudent } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

export const studentsRoute = new Router();

// Public routes for registration and login
studentsRoute.post("/register", registerStudent);
studentsRoute.post("/login", loginStudent);

// Protected routes
studentsRoute.route("/").get(protect, admin, getAllStudents); // Only admins can get all students
studentsRoute
  .route("/:id")
  .get(protect, getStudentById) // A student can get their own profile, an admin can get any
  .put(protect, updateStudent) // A student can update their own profile
  .delete(protect, admin, deleteStudent); // Only admins can delete students
