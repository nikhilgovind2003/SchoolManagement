import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true, // Ensure studentId is unique
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
    },
    class: {
      type: String,
      required: true,
    },
    issuedBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryHistory",
      required: false,
    },
    feesHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeesHistory",
      required: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
