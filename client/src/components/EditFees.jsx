import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editFeesRecord,
 fetchFeesRecords,
} from "../redux/features/fees/feesSlice";

const EditFees = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after updating the fees
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({}); // State to track validation errors

  // UseSelector to fetch the fees records state
  const fees = useSelector((state) => state.fees.feesRecords.fees);
  console.log(fees);

  const [newFees, setNewFees] = useState({
    studentId: "",
    feesType: "tuition", // Set default value
    amount: "",
    paymentDate: "",
    remarks: "",
  });

  useEffect(() => {
    const record = fees.find((r)=> r._id === id);
    console.log(record);
    
    if (record) {
      setNewFees({
        studentId: record.studentId,
        feesType: record.feesType, // Set default value
        amount: record.amount,
        paymentDate: record.paymentDate,
        remarks: record.remarks,
      });
    }
  }, [id, fees]);

  useEffect(() => {
    dispatch(fetchFeesRecords()); // Fetch fees records when the component loads
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFees((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validate = () => {
    const errors = {};
    if (!newFees.studentId) errors.studentId = "Student ID is required.";
    if (!newFees.feesType) errors.feesType = "Please select a fees type.";
    if (!newFees.amount || newFees.amount <= 0)
      errors.amount = "Enter a valid amount.";
    if (!newFees.paymentDate) errors.paymentDate = "Payment date is required.";
    if (!newFees.remarks) errors.remarks = "Remarks are required.";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return;
    }

    dispatch(editFeesRecord({id, updatedData: newFees}))
      .unwrap()
      .then(() => navigate("/fees-list"))
      .catch((error) => console.error("Failed to add fees:", error));
  };

  return (
    <div className="px-[550px] flex items-center pt-24 justify-center w-full h-screen">
      <div className="container p-6 bg-gray-400 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Fees</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Student Id</label>
            <input
              type="text"
              name="studentId"
              value={newFees.studentId}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.studentId && "border-red-500"
              }`}
            />
            {errors.studentId && (
              <p className="text-red-500">{errors.studentId}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Fees Type</label>
            <select
              name="feesType"
              value={newFees.feesType}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.feesType && "border-red-500"
              }`}
            >
              <option value="tuition">Tuition</option>
              <option value="library">Library</option>
              <option value="sports">Sports</option>
              <option value="lab">Lab</option>
              <option value="hostel">Hostel</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            {errors.feesType && (
              <p className="text-red-500">{errors.feesType}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={newFees.amount}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.amount && "border-red-500"
              }`}
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={newFees.paymentDate}
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.paymentDate && "border-red-500"
              }`}
            />
            {errors.paymentDate && (
              <p className="text-red-500">{errors.paymentDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Remarks</label>
            <input
              name="remarks"
              value={newFees.remarks}
              type="text"
              onChange={handleChange}
              className={`w-full border rounded p-2 ${
                errors.remarks && "border-red-500"
              }`}
            />
            {errors.remarks && <p className="text-red-500">{errors.remarks}</p>}
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

export default EditFees;
