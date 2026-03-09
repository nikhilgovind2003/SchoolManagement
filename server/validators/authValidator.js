import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequest,
];

export const registerValidator = [
  body("userName").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validateRequest,
];
