import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editLibraryRecord,
  // editLibraryRecord,
  fetchLibraryRecords,
} from "../redux/features/library/LibrarySlice";
import { useParams, useNavigate } from "react-router-dom";

const EditLibrary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const records = useSelector((state) => state.library.records?.books || []);
  console.log(records);

  const [formData, setFormData] = useState({
    bookName: "",
    borrowDate: "",
    returnDate: "",
    status: "borrowed", // Set a default status
  });
  
  const [errors, setErrors] = useState({}); // State to store validation errors

  useEffect(() => {
    if (records.length === 0) {
      dispatch(fetchLibraryRecords());
    }
  }, [dispatch, records.length]);

  useEffect(() => {
    const record = records.find((r) => r._id === id);
    if (record) {
      setFormData({
        bookName: record.bookName,
        borrowDate: record.borrowDate,
        returnDate: record.returnDate || "",
        status: record.status,
      });
    }
  }, [id, records]);

  const validate = () => {
    const validationErrors = {};
    if (!formData.bookName) {
      validationErrors.bookName = "Book Name is required.";
    }
    if (!formData.borrowDate) {
      validationErrors.borrowDate = "Borrow Date is required.";
    }
    if (!formData.status) {
      validationErrors.status = "Status is required.";
    }
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being changed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(); // Run validation
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors
      return; // Stop form submission if there are errors
    }
    
    dispatch(editLibraryRecord({ id, updatedData: formData }))
      .unwrap()
      .then(() => {
        navigate("/library-list");
      })
      .catch((error) => {
        console.error("Failed to update library record:", error);
      });
  };

  return (
    <div className="flex items-center px-[550px] justify-center w-full h-screen">
      <div className="container p-6 mt-24 bg-gray-400 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Library Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Book Name</label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              
            />
            {errors.bookName && <p className="text-red-500">{errors.bookName}</p>} {/* Display error */}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Borrow Date</label>
            <input
              type="date"
              name="borrowDate"
              value={formData.borrowDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
              
            />
            {errors.borrowDate && <p className="text-red-500">{errors.borrowDate}</p>} {/* Display error */}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
              
            >
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
            </select>
            {errors.status && <p className="text-red-500">{errors.status}</p>} {/* Display error */}
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

export default EditLibrary;
