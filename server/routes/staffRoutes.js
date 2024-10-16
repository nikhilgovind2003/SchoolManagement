import { Router } from "express";
import { createStaffs, deleteStaff, getAllStaffs, getOneStaffById, updateStaffById } from "../controllers/staffControllers.js";

const router = Router()

router.get("/", getAllStaffs)

router.post("/", createStaffs)

router.get("/:id", getOneStaffById)

router.put("/:id", updateStaffById)

router.delete("/:id", deleteStaff)

export default router