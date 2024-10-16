import { StudentModel } from "../models/index.js"; // Make sure this is correctly referenced

export const getAllStudents = async (req, res) => {
  const students = await StudentModel.find();

  if (students.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No students found",
    });
  }

  res.status(200).json({
    students,
  });
};

export const getOneStudentById = async (req, res) => {
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
};

export const addStudent = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
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
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await StudentModel.deleteOne({ _id: id });

  if (!student.deletedCount) {
    return res.status(404).json({
      success: false,
      message: "Student does not exist!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Student deleted successfully",
  });
};

export const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

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
};
