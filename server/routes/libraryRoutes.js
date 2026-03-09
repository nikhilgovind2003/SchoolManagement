import express from "express";
import {
  addNewBook,
  deleteBookById,
  getAllBooks,
  getAllIssuedBooks,
  getSingleBookById,
  updateBookById,
} from "../controllers/libraryController.js";
import { authorizedRoles } from "../middlewares/roleMiddleware.js";
import { addLibraryRecordValidator } from "../validators/libraryValidator.js";

const router = express.Router();
// // Get all books details
router.get("/", authorizedRoles("admin", "staff", "librarian"),getAllBooks);

// Add new book
router.post(
  "/",
  authorizedRoles("admin", "staff", "librarian"),
  addLibraryRecordValidator,
  addNewBook
);

// delete a book'
router.delete("/:id",authorizedRoles("admin","staff", "librarian"), deleteBookById);
// Get single book details
router.get("/issued-books",authorizedRoles("admin", "librarian"), getSingleBookById);

// Issued books
router.get("/issued-books",authorizedRoles("admin","librarian"), getAllIssuedBooks);

// Update a book
router.put("/:id",authorizedRoles("admin", "staff", "librarian"), updateBookById);

export default router;
