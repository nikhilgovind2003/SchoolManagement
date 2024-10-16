import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation after login
import axios from "axios"; // Assuming you're using axios for API calls

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const newUser = {
      userName,
      email,
      password
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { userName, email, password }
      );
      console.log(newUser);

      const role = "student";

      // alert("Succesfull");
      if (response.ok) {
        // alert("Succesfull");
      }

      // Store the user data in localStorage or context (based on your app structure)
      localStorage.setItem("userRole", role);

      // Redirect based on user role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "staff") {
        navigate("/office-dashboard");
      } else if (role === "librarian") {
        navigate("/librarian-dashboard");
      } else if (role === "student") {
        // navigate("/");
      } else {
        throw new Error("Unknown role");
      }
    } catch (error) {
      setError("account not not created");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-semibold text-center mb-6">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              UserName
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div className="form-group mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
          >
            {loading ? "Loading..." : "SignUp"}
          </button>
        </form>

        <p className=" mt-2  text-lg font-semibold">
          Already have account ?{" "}
          <Link className=" text-red-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
