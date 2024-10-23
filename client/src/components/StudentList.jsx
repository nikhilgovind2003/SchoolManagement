import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
} from "../redux/features/student/studentSlice";
import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdEye } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

const StudentList = () => {
  // Get user role from state
  const { role } = useSelector((state) => state?.userAuth.userInfo || {});
  const { students } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get students state from Redux

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [studentToDelete, setStudentToDelete] = useState(null); // Selected student to delete

  // Fetch students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleEdit = (student) => {
    navigate(`/students/edit/${student._id}`, { state: student });
  };
  const handleView = (student) => {
    navigate(`/students/view/${student._id}`, { state: student });
  };

  //  DELETE  MODEL
  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student); // Set the selected student object
    setIsModalOpen(true);
    // Open the modal
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      // Dispatch the deleteStudent action with the student ID (_id)
      dispatch(deleteStudent(studentToDelete._id)); // Use the _id directly
    }
    setIsModalOpen(false); // Close the modal after deletion
    setStudentToDelete(null); // Clear the selected student
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal without deleting
    setStudentToDelete(null); // Clear the selected student
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  return (
    <div className="container mx-auto px-44 pt-24">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-500 text-white text-center p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Total Students</h2>
          <p className="text-2xl">{students?.length || 0}</p>
        </div>

        <div className="bg-yellow-500 text-white text-center p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Class Levels</h2>
          <p className="text-2xl">
            {Array.isArray(students) &&
              new Set(students?.map((s) => s.class)).size}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <div className="space-x-2">
          {(role === "admin" || role === "staff" )? (
            <button
              onClick={handleAddStudent}
              className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <IoMdAdd size={20} className="mr-2" />
              Add Student
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4">Sl.No</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Age</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Class</th>
              {(role === "admin" || role === "staff") ? (
                <th className="text-left p-4">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="p-4">
                    {student.firstName + " " + student.lastName}
                  </td>
                  <td className="p-4">{student.age}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.class}</td>
                  {(role === "admin" || role === "staff") && (
                    <td className="p-4 flex space-x-2">
                      {/* Edit Button with Icon */}
                      <button
                        onClick={() => handleView(student)}
                        className="flex items-center bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                      >
                        <IoMdEye size={16} className="mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(student)}
                        className="flex items-center bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                      >
                        <AiFillEdit size={16} className="mr-1" />
                        Edit
                      </button>
                      {/* Delete Button with Icon */}
                      <button
                        onClick={() => handleOpenDeleteModal(student)}
                        className="flex items-center bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                      >
                        <AiFillDelete size={16} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the student "${studentToDelete?.firstName} ${studentToDelete?.lastName}"?`}
      />
    </div>
  );
};

export default StudentList;
