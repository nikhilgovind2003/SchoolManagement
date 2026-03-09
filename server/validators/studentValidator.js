import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

export const addStudentValidator = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("age").notEmpty().withMessage("Age is required"),
  body("class").notEmpty().withMessage("Class is required"),
  validateRequest,
];
