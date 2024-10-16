import { Router } from "express";
import { login, Logout, register } from "../controllers/authController.js";

const router = Router()


router.post("/login", login)
router.post("/register", register)
router.post("/logout", Logout)




export default router