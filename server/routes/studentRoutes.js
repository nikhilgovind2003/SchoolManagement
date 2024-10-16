import express from "express";
import { addStudent, deleteStudent, getAllStudents, getOneStudentById, updateStudentById } from "../controllers/studentController.js";

const router = express.Router();



// Get all student details
router.get("/",getAllStudents);


// Get the details of a single book
router.get("/:id", getOneStudentById);


// Create new student
router.post("/",addStudent);


// router.get("/subscription_by_user/:id", subscriptionByUser);


// Update the student
router.put("/:id",updateStudentById);


// Delete student
router.delete("/:id", deleteStudent);


export default router;