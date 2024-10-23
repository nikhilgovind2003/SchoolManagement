import bcrypt from "bcrypt"; // Import bcrypt
import { userModel } from "../models/index.js";

export const getAllStaffs = async (req, res) => {
  try {
    const staffs = await userModel.find({
      role: { $in: ["staff", "librarian"] },
    });
    res.json({
      staffs,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createStaffs = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    console.log(role);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create staff with hashed password
    await userModel.create({ userName, email, password: hashedPassword, role });

    const data = {
      userName,
      email,
      role,
      // Do not send the hashed password back to the client
    };

    res.json({
      message: "Created successfully",
      staff: data,
    });

    console.log(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const updateStaffById = async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    console.log("data", data);
console.log(id);

    // checking book is exists or not
    const updatedBook = await userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });


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
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
