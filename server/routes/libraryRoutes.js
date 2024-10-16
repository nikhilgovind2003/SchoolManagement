import express from "express";
import { addNewBook, getAllBooks, getAllIssuedBooks, getSingleBookById, updateBookById } from "../controllers/libraryController.js";

const router = express.Router();
// // Get all books details
router.get("/", getAllBooks);

// Add new book
router.post("/", addNewBook);

// Get single book details
router.get("/:id", getSingleBookById);

// Issued books
router.get("/issued-books", getAllIssuedBooks);

// Update a book
router.put("/updatedbook/:id", updateBookById);



export default router;