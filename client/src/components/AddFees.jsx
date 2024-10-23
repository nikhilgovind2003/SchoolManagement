import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addFeesRecord,
  fetchFeesRecords,
} from "../redux/features/fees/feesSlice";

const AddFees = () => {
  const navigate = useNavigate(); // For navigation after updating the fees
  const dispatch = useDispatch();

  const [newFees, setNewFees] = useState({
    studentId: "",
    feesType: "tuition", // Default value
    amount: "",
    paymentDate: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({}); // Track form errors

  useEffect(() => {
    dispatch(fetchFeesRecords()); // Fetch students when the component loads
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFees((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!newFees.studentId.trim())
      newErrors.studentId = "Student ID is required";
    if (!newFees.amount || newFees.amount <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!newFees.paymentDate)
      newErrors.paymentDate = "Payment Date is required";
    if (!newFees.remarks.trim()) newErrors.remarks = "Remarks cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addFeesRecord(newFees)); // Dispatch action
      console.log(newFees);
      navigate("/fees-list"); // Navigate on success
    }
  };

  return (
    <div className="px-[550px] flex items-center pt-24 justify-center w-full h-screen">
      <div className="container p-6 bg-gray-400 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Fees Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Student Id</label>
            <input
              type="text"
              name="studentId"
              value={newFees.studentId}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.studentId ? "border-red-500" : ""
              }`}
            />
            {errors.studentId && (
              <p className="text-red-500 text-sm">{errors.studentId}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Fees Type</label>
            <select
              name="feesType"
              value={newFees.feesType}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="tuition">Tuition</option>
              <option value="library">Library</option>
              <option value="sports">Sports</option>
              <option value="lab">Lab</option>
              <option value="hostel">Hostel</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={newFees.amount}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.amount ? "border-red-500" : ""
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={newFees.paymentDate}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.paymentDate ? "border-red-500" : ""
              }`}
            />
            {errors.paymentDate && (
              <p className="text-red-500 text-sm">{errors.paymentDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={newFees.remarks}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.remarks ? "border-red-500" : ""
              }`}
            />
            {errors.remarks && (
              <p className="text-red-500 text-sm">{errors.remarks}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate("/fees-list")}
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

export default AddFees;
