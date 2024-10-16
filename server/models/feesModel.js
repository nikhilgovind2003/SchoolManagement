import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Student model
      required: true,
    },
    feeType: {
      type: String,
      enum: ["tuition", "library", "sports", "lab", "hostel", "miscellaneous"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const feeModel = mongoose.model("Fee", feeSchema);

export default feeModel;
