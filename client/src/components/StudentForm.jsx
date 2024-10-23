import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent } from "../redux/features/student/studentSlice"; 
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    class: "",
  });

  const [errors, setErrors] = useState({});
  const students = useSelector((state) => state);
  console.log(students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    if (!newStudent.firstName.trim()) formErrors.firstName = "First name is required.";
    if (!newStudent.lastName.trim()) formErrors.lastName = "Last name is required.";
    if (!newStudent.age || isNaN(newStudent.age) || newStudent.age <= 0)
      formErrors.age = "Valid age is required.";
    if (!newStudent.email || !/\S+@\S+\.\S+/.test(newStudent.email))
      formErrors.email = "Valid email is required.";
    if (!newStudent.class.trim()) formErrors.class = "Class is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddStudent = () => {
    if (validate()) {
      dispatch(addStudent(newStudent));
      setNewStudent({ firstName: "", lastName: "", age: "", email: "", class: "" });
      navigate("/student-list");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-24 px-[550px]">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Add New Student Form */}
      <div className="bg-gray-400 p-4 mb-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-3">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* First Name */}
          <div>
            <label className="block font-medium mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={newStudent.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className={`border p-2 rounded-md w-full ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={newStudent.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className={`border p-2 rounded-md w-full ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium mb-1" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={newStudent.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className={`border p-2 rounded-md w-full ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className={`border p-2 rounded-md w-full ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Class */}
          <div>
            <label className="block font-medium mb-1" htmlFor="class">
              Class
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={newStudent.class}
              onChange={handleInputChange}
              placeholder="Enter class"
              className={`border p-2 rounded-md w-full ${
                errors.class ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.class && (
              <p className="text-red-500 text-sm mt-1">{errors.class}</p>
            )}
          </div>
        </div>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleAddStudent}
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentForm;
