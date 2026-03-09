import express from "express";
import { addNewFees, deleteFeesById, getAllFees, updateFeesById } from "../controllers/feesContoller.js";
import { addFeesValidator } from "../validators/feesValidator.js";

const router = express.Router();


// // Get all books details
router.get("/", getAllFees);

// Add new book
router.post(
  "/",
  addFeesValidator,
  addNewFees
);

// delete a book'
router.delete("/:id", deleteFeesById);

// Update a book
router.put("/:id", updateFeesById);

export default router;