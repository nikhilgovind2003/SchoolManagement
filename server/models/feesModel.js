import mongoose from "mongoose";

const feesSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    feesType: {
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
      type: String,
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

const feesModel = mongoose.model("Fees", feesSchema);

export default feesModel;
