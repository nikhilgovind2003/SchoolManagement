import { Router } from "express";
import { createStaffs, deleteStaff, getAllStaffs, updateStaffById } from "../controllers/staffControllers.js";

const router = Router()

router.get("/", getAllStaffs)

router.post("/", createStaffs)


router.put("/:id", updateStaffById)

router.delete("/:id", deleteStaff)

export default router