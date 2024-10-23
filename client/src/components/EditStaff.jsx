import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, editStaff } from "../redux/features/staff/staffSlice"; 
import { useNavigate, useParams } from "react-router-dom";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const staffs = useSelector((state) => state.staff.allStaffs.staffs);
  
  const [formData, setFormData] = useState({
    userName: "",
    role: "staff", // Default value set to 'staff'
    email: "",
    password: "",
  });

  useEffect(() => {
    if (staffs.length === 0) dispatch(fetchStaff());
  }, [dispatch, staffs.length]);

  useEffect(() => {
    const staff = staffs.find((s) => s._id === id);
    if (staff) {
      setFormData({
        userName: staff.userName || "",
        role: staff.role || "",
        email: staff.email || "",
      });
    }
  }, [id, staffs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    dispatch(editStaff({ id, updatedData: formData }))
      .then(() => navigate("/staff-list"))
      .catch((err) => console.error("Failed to update staff:", err));
  };

  // if (status === "loading") return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex items-center px-[550px] justify-center w-full h-screen">
      <div className="container p-6 mt-24 bg-gray-400 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Staff</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Staff Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter staff name"
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
              placeholder="Enter staff email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="staff">Staff</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate("/staff-list")}
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

export default EditStaff;
