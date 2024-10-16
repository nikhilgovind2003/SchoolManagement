import { userModel } from "../models/index.js";
export const getAllStaffs = async (req, res) => {
  try {
    const allStaffs = await userModel.find({ role: { $in: ["staff"] } });
    res.json({
      success: true,
      allStaffs,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createStaffs = async (req, res) => {
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

export const updateStaffById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    const updatedStaffData = await userModel.findOneAndUpdate(
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
  
    if (!updatedStaffData) {
      return res.status(404).json({
        success: false,
        message: "staff does not exists!",
      });
    }
  
    return res.status(200).json({
      success: true,
      message: "staff updated succesfully!",
      data: updatedStaffData,
    });
  };
  
export const getOneStaffById = async (req, res) => {
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

export const deleteStaff = async (req, res) => {
  const { id } = req.params;
  const staff = await userModel.deleteOne({ _id: id });

  if (!staff) {
    return res.status(404).json({
      success: false,
      message: "staff does not exists!",
    });
  }

  return res.status(200).json({
    success: true,
    messages: "staff deleted succesfully",
    data: staff,
  });
};
