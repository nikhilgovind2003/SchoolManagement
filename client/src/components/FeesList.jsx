import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ConfirmationModal from "./ConfirmationModal"; // Modal for delete confirmation

// Redux actions for fees management
import {
  fetchFeesRecords,
  deleteFeesRecord,
} from "../redux/features/fees/feesSlice";

const FeesList = () => {
  const { userInfo } = useSelector((state) => state.userAuth); // User info from auth state
  const { fees } = useSelector((state) => state.fees.feesRecords); // Fees data from Redux
 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [recordToDelete, setRecordToDelete] = useState(null); // Selected record for deletion

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch fees records on component mount
  useEffect(() => {
    dispatch(fetchFeesRecords());
  }, [dispatch]);

  const handleAddRecord = () => {
    navigate("/add-fees-record");
  };

  const handleEdit = (record) => {
    navigate(`/fees/edit/${record._id}`, { state: record });
  };

  const handleOpenDeleteModal = (record) => {
    setRecordToDelete(record);
    
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (recordToDelete) {
      dispatch(deleteFeesRecord(recordToDelete._id)); // Use _id for deletion
    }
    setIsModalOpen(false);
    setRecordToDelete(null);
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRecordToDelete(null);
  };

  return (
    <div className="container mx-auto p-6 px-44 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fees Payment Records</h1>
        {(userInfo.role === "admin" || userInfo.role === 'staff') && (
          <button
            onClick={handleAddRecord}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <IoMdAdd size={20} className="mr-2" />
            Add Fees
          </button>
        )}
      </div>

      <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b">Sl. No</th>
              <th className="py-2 px-4 text-left border-b">StudentId</th>
              <th className="py-2 px-4 text-left border-b">Fees Type</th>
              <th className="py-2 px-4 text-left border-b">Amount</th>
              <th className="py-2 px-4 text-left border-b">Payment Date</th>
              <th className="py-2 px-4 text-left border-b">Remarks</th>
              {(userInfo.role === "admin"||userInfo.role === "staff") && (
                <th className="py-2 px-4 text-left border-b">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(fees) && fees.length > 0 ? (
              fees.map((record, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{record.studentId}</td>
                  <td className="py-2 px-4">{record.feesType}</td>
                  <td className="py-2 px-4">{record.amount}</td>
                  <td className="py-2 px-4">{record.paymentDate}</td>
                  <td className="py-2 px-4">{record.remarks}</td>
                  {(userInfo.role === "admin"||userInfo.role === "staff" ) && (
                    <td className="py-2 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="flex items-center bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition duration-200"
                      >
                        <AiFillEdit size={16} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(record)}
                        className="flex items-center bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200"
                      >
                        <AiFillDelete size={16} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the record for "${recordToDelete?.name}"?`}
      />
    </div>
  );
};

export default FeesList;
