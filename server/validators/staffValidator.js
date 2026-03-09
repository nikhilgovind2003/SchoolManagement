import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

export const createStaffValidator = [
  body("userName").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("role")
    .isIn(["admin", "staff", "librarian"])
    .withMessage("Invalid role"),
  validateRequest,
];
