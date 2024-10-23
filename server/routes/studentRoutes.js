import express from "express";
import { addStudent, deleteStudent, getAllStudents, getOneStudentById, updateStudentById } from "../controllers/studentController.js";
import { authorizedRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Get all student details
router.get("/",authorizedRoles("admin", "staff", "librarian"), getAllStudents);

// Get the details of a single book
router.get("/:id",authorizedRoles("admin", "staff"), getOneStudentById);

// Create new student
router.post("/",authorizedRoles("admin", "staff"), addStudent);

// Update the student
router.put("/:id",authorizedRoles("admin", "staff"), updateStudentById);

// Delete student
router.delete("/:id", authorizedRoles("admin", "staff"), deleteStudent);

export default router;