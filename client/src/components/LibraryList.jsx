import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLibraryRecords,
  deleteLibraryRecord,
} from "../redux/features/library/LibrarySlice";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const LibraryList = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.userAuth.userInfo || []);
  const records = useSelector((state) => state.library.records.books || []);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
  const [recordToDelete, setRecordToDelete] = useState(null); // Store the selected record
  const navigate = useNavigate();
  // Open modal and set the record to delete
  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsModalOpen(true);
  };

  // Fetch library records when the component mounts
  useEffect(() => {
    dispatch(fetchLibraryRecords());
  }, [dispatch]);

  // Handle confirmation to delete the record
  const handleConfirmDelete = () => {
    dispatch(deleteLibraryRecord(recordToDelete._id));
    setIsModalOpen(false);
    setRecordToDelete(null); // Reset the state after deletion
  };

  const handleAddLibrary = () => {
    navigate("/add-book");
  };
  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRecordToDelete(null); // Reset the state when closing
  };

  const handleEdit = (record) => {
    navigate(`/library/edit/${record._id}`, { state: record });
  };

  const totalBooks = records.length;
  const borrowedCount =
    Array.isArray(records) &&
    records.filter((record) => record.status === "borrowed").length;
  const returnedCount =
    Array.isArray(records) &&
    records.filter((record) => record.status === "returned").length;

  return (
    <div className="container mx-auto p-4 pt-24 px-44">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-green-500 text-white p-4 rounded-lg text-center font-semibold shadow-lg">
          <h2 className="text-lg">Total NUmber of Books</h2>
          <p className="text-2xl">{totalBooks}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center font-semibold shadow-lg">
          <h2 className="text-lg">Number of books borrowed</h2>
          <p className="text-2xl">{borrowedCount}</p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-lg text-center font-semibold shadow-lg">
          <h2 className="text-lg">Number of books returned</h2>
          <p className="text-2xl">{returnedCount}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Library Records
        </h1>

        <div className="space-x-2 mb-4">
          {(role === "admin" || role === "librarian") ? (
            <button
              onClick={handleAddLibrary}
              className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <IoMdAdd size={20} className="mr-2" />
              Add Books
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="overflow-x-auto shadow-lg ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Sl.No</th>
              <th className="px-4 py-2 text-left border-b">Title</th>
              <th className="px-4 py-2 text-left border-b">Borrow Date</th>
              <th className="px-4 py-2 text-left border-b">Return Date</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              {(role === "admin" || role==="librarian") && (
                <th className="px-4 py-2 text-left border-b">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No records found
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{record.bookName}</td>
                  <td className="px-4 py-2 border-b">{record.borrowDate}</td>
                  {record.status === "returned" ? (
                    <td className="px-4 py-2 border-b">{record.returnDate}</td>
                  ) : (
                    <td></td>
                  )}
                  <td className="px-4 py-2 border-b">{record.status}</td>
                  {(role === "admin"|| role === "librarian") && (
                    <td className="px-4 py-2 border-b flex items-center gap-4">
                      <button
                        className="flex items-center bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition duration-200"
                        onClick={() => handleEdit(record)}
                      >
                        <AiFillEdit size={16} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(record)}
                        className="flex items-center bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200"
                      >
                        <AiFillDelete size={16} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the record "${recordToDelete?.bookName}"?`}
      />
    </div>
  );
};

export default LibraryList;
