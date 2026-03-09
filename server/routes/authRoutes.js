import { Router } from "express";
import { login, Logout, register } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidator.js";

const  router = Router()


router.post("/login", loginValidator, login);
router.post("/register", registerValidator, register);
router.post("/logout", Logout);

export default router;