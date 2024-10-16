import { userModel } from "../models/index.js";
export const getAllLibrarian = async (req, res) => {
  try {
    const allLibrarian = await userModel.find({ role: { $in: ["librarian"] } });
    res.json({
      success: true,
      allLibrarian,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createLibrarian = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    await userModel.create({ userName, email, password, role });

    const data = {
      userName,
      email,
      password,
      role,
    };

    res.json({
      message: "Created successfully",
      data: data,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const updateLibrarianById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    const updatedLibrarianData = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    );
  
    if (!updatedLibrarianData) {
      return res.status(404).json({
        success: false,
        message: "librarian does not exists!",
      });
    }
  
    return res.status(200).json({
      success: true,
      message: "librarian updated succesfully!",
      data: updatedStaffData,
    });
  };
  
export const getOneLibrarianById = async (req, res) => {
  let { id } = req.params;

  const student = await userModel.findById(id);

  if (!student) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User found",
    data: student,
  });
};

export const deleteLibrarian = async (req, res) => {
  const { id } = req.params;
  const librarian = await userModel.deleteOne({ _id: id });

  if (!librarian) {
    return res.status(404).json({
      success: false,
      message: "librarian does not exists!",
    });
  }

  return res.status(200).json({
    success: true,
    messages: "librarian deleted succesfully",
    data: librarian,
  });
};
