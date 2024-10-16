// src/components/StudentList.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/features/student/studentSlice"; // Import actions
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"; // Import icons for Edit and Delete

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.students.students); // Fixed state selection
  useEffect(() => {
    dispatch(fetchStudents()); // Fetch students on component mount
  }, [dispatch]);

  const handleEdit = (student) => {
    navigate(`/admin/students/edit/${student.id}`, { state: student });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student List</h1>

      {/* Add Student Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddStudent}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-500 transition duration-200"
        >
          <IoMdAdd size={20} className="mr-2" />
          Add Student
        </button>
      </div>

      {/* Student Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Age</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Class</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {/* Convert students object into an array and map over it */}
          {Array.isArray(students) && students.length > 0 ? (
            students.map((student) => (
              <tr
                key={student.id}
                className="border-b  border-gray-200 hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-6">{student.name}</td>
                <td className="py-3 px-6">{student.age}</td>
                <td className="py-3 px-6">{student.email}</td>
                <td className="py-3 px-6">{student.class}</td>
                <td className="py-3 px-6 flex space-x-2">
                  {/* Edit Button with Icon */}
                  <button
                    onClick={() => handleEdit(student)}
                    className="flex items-center bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                  >
                    <AiFillEdit size={16} className="mr-1" />
                    Edit
                  </button>
                  {/* Delete Button with Icon */}
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="flex items-center bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  >
                    <AiFillDelete size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
