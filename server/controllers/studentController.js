import { StudentModel } from "../models/index.js"; // Make sure this is correctly referenced
import { v4 as uuidv4 } from "uuid";

export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find().populate("issuedBook");
    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }
console.log(students);

    res.status(200).json({
      students,
    });

  } catch (error) {
    res.json({
      error: error.message,
      success: false,
    });
  }
};

export const getOneStudentById = async (req, res) => {
  try {
    let { id } = req.params;

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Found student",
      data: student,
    });
  } catch (error) {
    res.json({
      error: error.message,
      success: false,
    });
  }
};

export const addStudent = async (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Check for existing email
    const existingEmail = await StudentModel.findOne({ email: data.email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Ensure studentId is provided or generate it automatically
    if (!data.studentId) {
      data.studentId = uuidv4(); // Generate a UUID if studentId is not provided
    }

    // Check if studentId is unique
    const existingStudentId = await StudentModel.findOne({
      studentId: data.studentId,
    });
    if (existingStudentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID already exists.",
      });
    }

    // Create the new student
    const newStudent = await StudentModel.create(data);

    return res.status(201).json({
      success: true,
      message: "Student added successfully.",
      data: newStudent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add student",
      error: error,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params; // Extract _id from the request params

    // Find and delete the student by ID
    const result = await StudentModel.findOneAndDelete({ _id: id });

    // If no student was deleted (i.e., no matching student found), return a 404 error
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Student does not exist!",
      });
    }

    // Return success response if deletion was successful
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    // Return a 500 error for any other issues during the delete process
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the student.",
      error: error.message,
    });
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedStudentData = await StudentModel.findOneAndUpdate(
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

    if (!updatedStudentData) {
      return res.status(404).json({
        success: false,
        message: "Student does not exist!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      data: updatedStudentData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "An error occurred while deleting the student.",
      error: error.message,
    });
  }
};
