import { body } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

export const addLibraryRecordValidator = [
  body("bookName").trim().notEmpty().withMessage("Book name is required"),
  body("borrowDate").notEmpty().withMessage("Borrow date is required"),
  body("status")
    .isIn(["borrowed", "returned"])
    .withMessage("Status must be either borrowed or returned"),
  validateRequest,
];
