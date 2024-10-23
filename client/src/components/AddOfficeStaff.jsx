import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStaff } from "../redux/features/staff/staffSlice";
import { useNavigate } from "react-router-dom";

const AddOfficeStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to hold form data and errors
  const [newStaff, setNewStaff] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({}); // State for validation errors

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevData) => ({ ...prevData, [name]: value }));

    // Validate the specific field when its value changes
    if (errors[name]) {
      validateField(name, value); // Clear the error dynamically if valid
    }
  };

  // Field-level validation for dynamic error checking
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "userName":
        if (!value) error = "Username is required";
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email address is invalid";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      case "role":
        if (!value) error = "Position is required";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Form-level validation to ensure all fields are valid before submission
  const validateForm = () => {
    const newErrors = {};

    // Validate each field in the form
    Object.entries(newStaff).forEach(([key, value]) => {
      validateField(key, value); // Call the field-level validation
      if (!value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Dispatch action to add staff and reset form on success
    try {
      await dispatch(addStaff(newStaff));
      setNewStaff({ userName: "", email: "", password: "", role: "" }); // Reset form
      navigate("/staff-list"); // Navigate to the staff list page
    } catch (error) {
      console.error("Failed to add staff:", error); // Handle any dispatch errors
    }
  };

  return (
    <div className="p-6 bg-gray-300 rounded-lg shadow-md max-w-md mx-auto mt-44">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Staff Member</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={newStaff.userName}
            onChange={handleChange}
            className={`mt-1 block w-full py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
              errors.userName ? "border-red-500" : ""
            }`}
          />
          {errors.userName && <p className="text-red-500 font-semibold text-xs mt-1">{errors.userName}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newStaff.email}
            onChange={handleChange}
            className={`mt-1 block w-full py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-red-500 font-semibold text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={newStaff.password}
            onChange={handleChange}
            className={`mt-1 block w-full py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && <p className="text-red-500 font-semibold text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Role Select Input */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Position:
          </label>
          <select
            id="role"
            name="role"
            value={newStaff.role}
            onChange={handleChange}
            className={`mt-1 block w-full py-2 px-4 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
              errors.role ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a position</option>
            <option value="staff">Staff</option>
            <option value="librarian">Librarian</option>
          </select>
          {errors.role && <p className="text-red-500 font-semibold text-xs mt-1">{errors.role}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddOfficeStaff;
