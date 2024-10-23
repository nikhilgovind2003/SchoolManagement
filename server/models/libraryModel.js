import mongoose from "mongoose";

const libraryHistorySchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    borrowDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      required: true,
    },
  },
  { timestamps: true }
);

const LibraryHistory = mongoose.model("LibraryHistory", libraryHistorySchema);
export default LibraryHistory;
