import { feesModel } from "../models/index.js";

export const getAllFees = async (req, res) => {
  try {
    const fees = await feesModel.find()
    if (fees.length === 0) {
      return res.json({
        succes: false,
        message: "No fees found",
      });
    }
    res.status(200).json({
      fees,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const addNewFees = async (req, res) => {
  try {
    const { studentId, feesType, amount, paymentDate, remarks } = req.body;

    // Validate if all required fields are present
    if (!studentId || !feesType || !amount || !paymentDate || !remarks) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details.",
      });
    }

    // Create the fees record with an object
    const newFee = await feesModel.create({
      studentId,
      feesType,
      amount,
      paymentDate,
      remarks,
    });

    console.log(newFee);

    return res.status(200).json({
      success: true,
      message: "Fees record added successfully.",
      newFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add fees record",
      error: error.message,
    });
  }
};

export const updateFeesById = async (req, res) => {
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

    // checking fees is exists or not
    const updatedFees = await feesModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    console.log(updatedFees);

    // const updateUser = await feesModel.findOneAndUpdate({ _id: id }, data, {
    //   new: true,
    // });

    return res.status(200).json({
      succes: true,
      message: "fees details updated successfully!",
      data: updatedFees,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFeesById = async (req, res) => {
  try {
    const { id } = req.params; // Extract _id from the request params

    // Find and delete the fees
    const fees = await feesModel.findByIdAndDelete({ _id: id });
    console.log(fees);

    // If no fees was deleted, return a 404 error
    if (!fees.deletedCount) {
      return res.status(404).json({
        success: false,
        message: "fees does not exist!",
      });
    }

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "fees deleted successfully",
    });
  } catch (error) {
    // If any error occurs, catch and return a server error
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the fees.",
      error: error.message,
    });
  }
};

// export const getSingleBookById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const fees = await feesModel.findById(id);

//       if (!fees)
//         return res.status(404).json({
//           succes: false,
//           message: `fees with this id not found at id: ${id}`,
//         });

//       return res.status(200).json({
//         succes: true,
//         message: `fees is found at id:${id}`,
//         data: fees,
//       });
//     } catch (error) {
//       res.json(error.message);
//     }
//   };

// export const getAllIssuedBooks = async (req, res) => {
//   try {
//     const users = await StudentModel
//       .find({ issuedBook: { $exsist: true } })
//       .populate("issuedBook");
//     const issuedBook = users.map((each) => new issuedBook(each));

//     if (issuedBook.length === 0) {
//       return res.status(404).json({
//         succes: false,
//         message: "No books issued by user!",
//       });
//     }
//     res.status(200).json({
//       succes: true,
//       message: "fees issued by user found!!!",
//       data: issuedBook,
//     });
//   } catch (error) {
//     res.json(error.message);
//   }
// };
