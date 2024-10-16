import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    libraryHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LibraryHistory",
      },
    ],
    feesHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeesHistory",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
