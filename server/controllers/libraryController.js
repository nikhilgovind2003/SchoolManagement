import { userModel, libraryModel, StudentModel } from "../models/index.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await libraryModel.find()
    if (books.length === 0) {
      return res.json({
        succes: false,
        message: "No books found",
      });
    }
    res.status(200).json({
      books,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getSingleBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await libraryModel.findById(id);

    if (!book)
      return res.status(404).json({
        succes: false,
        message: `Book with this id not found at id: ${id}`,
      });

    return res.status(200).json({
      succes: true,
      message: `Book is found at id:${id}`,
      data: book,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getAllIssuedBooks = async (req, res) => {
  try {
    const users = await StudentModel.find({
      issuedBook: { $exsist: true },
    }).populate("issuedBook");
    const issuedBook = users.map((each) => new issuedBook(each));

    if (issuedBook.length === 0) {
      return res.status(404).json({
        succes: false,
        message: "No books issued by user!",
      });
    }
    res.status(200).json({
      succes: true,
      message: "Book issued by user found!!!",
      data: issuedBook,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const addNewBook = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Validate if all required data is present
    if (!data || !data.bookName || !data.borrowDate || !data.status) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required details (bookName, borrowDate, status).",
      });
    }

    // Create new book record in the library collection
    await libraryModel.create(data);

    // Fetch all books to confirm the addition
    const addBooks = await libraryModel.find();

    console.log(addBooks); // Log the added books for debugging

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      addBooks,
    });
  } catch (error) {
    console.error("Error adding book:", error.message); // Log the error
    return res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
};

export const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("data", data);

    if (!data) {
      return res.status(200).json({
        succes: false,
        message: "Not blanks allowed",
      });
    }

    // checking book is exists or not
    const updatedBook = await libraryModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });


    return res.status(200).json({
      succes: true,
      message: "Book details updated successfully!",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params; // Extract _id from the request params

    // Find and delete the student
    const book = await libraryModel.deleteOne({ _id: id });
    console.log(book);

    // If no student was deleted, return a 404 error
    if (!book.deletedCount) {
      return res.status(404).json({
        success: false,
        message: "Student does not exist!",
      });
    }

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    // If any error occurs, catch and return a server error
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the student.",
      error: error.message,
    });
  }
};
