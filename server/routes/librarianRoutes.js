import { Router } from "express";
import { createLibrarian, deleteLibrarian, getAllLibrarian, getOneLibrarianById, updateLibrarianById } from "../controllers/librarianController.js";

const router = Router()

router.get("/", getAllLibrarian)

router.post("/", createLibrarian)

router.get("/:id", getOneLibrarianById)

router.put("/:id", updateLibrarianById)

router.delete("/:id", deleteLibrarian)

export default router