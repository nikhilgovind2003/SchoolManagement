import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLibraryRecord,
  fetchLibraryRecords,
} from "../redux/features/library/LibrarySlice";
import { useNavigate } from "react-router-dom";

const AddLibrary = () => {
  const navigate = useNavigate(); // For navigation after updating the record
  const dispatch = useDispatch();

  const records = useSelector((state) => state.library.records?.books || []);
  console.log(records);

  const [newLibrary, setNewLibrary] = useState({
    bookName: "",
    borrowDate: "",
    returnDate: "",
    status: "borrowed", // Set default status
  });

  const [errors, setErrors] = useState({}); // Track form errors

  // Fetch records if not already loaded
  useEffect(() => {
    dispatch(fetchLibraryRecords()); // Fetch library records when the component loads
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLibrary((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!newLibrary.bookName.trim()) newErrors.bookName = "Book name is required";
    if (!newLibrary.borrowDate) newErrors.borrowDate = "Borrow date is required";
    if (!newLibrary.returnDate) newErrors.returnDate = "Return date is required";
    if (newLibrary.returnDate && newLibrary.returnDate < newLibrary.borrowDate) {
      newErrors.returnDate = "Return date cannot be earlier than borrow date";
    }
    if (!newLibrary.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleAddLibrary = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addLibraryRecord(newLibrary)); // Dispatch action
      setNewLibrary({ bookName: "", borrowDate: "", returnDate: "", status: "borrowed" }); // Reset form
      navigate("/library-list"); // Navigate on success
    }
  };

  return (
    <div className="flex items-center px-[550px] justify-center w-full h-screen">
      <div className="container p-6 mt-24 bg-gray-400 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Library Record</h2>
        <form onSubmit={handleAddLibrary}>
          <div className="mb-4">
            <label className="block mb-1">Book Name</label>
            <input
              type="text"
              name="bookName"
              value={newLibrary.bookName}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.bookName ? "border-red-500" : ""}`}
              
            />
            {errors.bookName && <p className="text-red-500 text-sm">{errors.bookName}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Borrow Date</label>
            <input
              type="date"
              name="borrowDate"
              value={newLibrary.borrowDate}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.borrowDate ? "border-red-500" : ""}`}
              
            />
            {errors.borrowDate && <p className="text-red-500 text-sm">{errors.borrowDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={newLibrary.returnDate}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.returnDate ? "border-red-500" : ""}`}
            />
            {errors.returnDate && <p className="text-red-500 text-sm">{errors.returnDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={newLibrary.status}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${errors.status ? "border-red-500" : ""}`}
              
            >
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/library-list")}
              className="bg-gray-400 font-semibold hover:bg-blue-600 hover:border-white hover:text-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 font-semibold text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLibrary;
