import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  editStudent,
  deleteStudent,
} from "../redux/features/student/studentSlice"; // Assuming you have a student slice
import {  useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [editingStudent, setEditingStudent] = useState(null); // Store student being edited
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    class: "",
  }); // New student details

  const students = useSelector((state) => state); // Get students from Redux
  console.log(students);

  useEffect(() => {
    dispatch(fetchStudents()); // Fetch students when the component loads
  }, [dispatch]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };


  
  // Submit new student
  const handleAddStudent = () => {
    dispatch(addStudent(newStudent));
    setNewStudent({ name: "", age: "", email: "", class: "" });
    navigate("/student-list")
  };


  
  // // Handle edit form input changes
  // const handleEditInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditingStudent({ ...editingStudent, [name]: value });
  //   navigate("/student-list");
  // };

  // // Submit edited student
  // const handleSaveEdit = (id) => {
  //   dispatch(editStudent({ ...editingStudent, id }));
  //   setEditingStudent(null);
  // };

  // // Handle delete student
  // const handleDeleteStudent = (id) => {
  //   dispatch(deleteStudent(id));
  // };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Add New Student Form */}
      <div className="bg-gray-100 p-4 mb-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-3">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            placeholder="Student Name"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            name="age"
            value={newStudent.age}
            onChange={handleInputChange}
            placeholder="Student Age"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            placeholder="Student Email"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            name="class"
            value={newStudent.class}
            onChange={handleInputChange}
            placeholder="Class"
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleAddStudent}
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentForm;
