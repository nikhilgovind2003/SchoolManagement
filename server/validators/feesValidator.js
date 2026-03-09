import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

export const addFeesValidator = [
  body("studentId").notEmpty().withMessage("Student ID is required"),
  body("feesType")
    .isIn(["tuition", "library", "sports", "lab", "hostel", "miscellaneous"])
    .withMessage("Invalid fees type"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => value >= 0)
    .withMessage("Amount must be positive"),
  body("paymentDate").notEmpty().withMessage("Payment date is required"),
  validateRequest,
];
