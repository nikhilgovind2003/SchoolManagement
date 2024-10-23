import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, fetchStudents } from "../redux/features/student/studentSlice";
import { useParams, useNavigate } from "react-router-dom";

const StudentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    class: "",
  });

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  useEffect(() => {
    const student = students.find((s) => s._id === id);
    if (student) {
      setFormData(student);
      console.log("Loaded student data:", student); // Debugging line
    }
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing field:", name, "Value:", value); // Debugging line
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ id, studentData: formData }))
      .unwrap()
      .then(() => {
        navigate("/student-list");
      })
      .catch((error) => {
        console.error("Failed to update student:", error);
      });
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex items-center px-64 justify-center w-full h-screen">
      <div className="container p-6 mt-24 bg-gray-400 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate("/student-list")}
              className="bg-gray-400 font-semibold hover:bg-blue-600 hover:border-white hover:text-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 font-semibold text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEdit;
