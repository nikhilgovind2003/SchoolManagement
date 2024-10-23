import express from "express";
import { addNewFees, deleteFeesById, getAllFees, updateFeesById } from "../controllers/feesContoller.js";

const router = express.Router();


// // Get all books details
router.get("/", getAllFees);

// Add new book
router.post("/", addNewFees);

// delete a book'
router.delete("/:id", deleteFeesById);

// Update a book
router.put("/:id", updateFeesById);

export default router;