import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff, deleteStaff } from "../redux/features/staff/staffSlice";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ConfirmationModal from "./ConfirmationModal";

const StaffList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { staffs, loading, error } = useSelector((state) => state.staff.allStaffs);
  
  // State to manage modal visibility and selected staff member for deletion
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleEdit = (staffMember) => {
    navigate(`/staff/edit/${staffMember._id}`, { state: staffMember });
  };

  const handleDelete = (_id) => {
    setStaffToDelete(_id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      dispatch(deleteStaff(staffToDelete));
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStaffToDelete(null);
  };

  const handleAddStaff = () => {
    navigate("/add-staff");
  };

  const librarianCount = Array.isArray(staffs) && staffs.filter((staff) => staff.role === 'librarian').length;
  const staffCount = Array.isArray(staffs) && staffs.filter((staff) => staff.role === 'staff').length;

  return (
    <div className="container mx-auto px-44 pt-24">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-500 text-white p-4 rounded-lg text-center shadow-lg">
          <h2 className="text-lg font-bold">Total Staffs</h2>
          <h2 className="text-2xl font-bold">{staffCount}</h2>
        </div>
        <div className="bg-gray-500 text-white p-4 rounded-lg text-center shadow-lg">
          <h2 className="text-lg font-bold">Total Librarian</h2>
          <h2 className="text-2xl font-bold">{librarianCount}</h2>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff List</h1>
        <button
          onClick={handleAddStaff}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg transition duration-200"
        >
          <IoMdAdd size={20} className="mr-2" />
          Add Staff
        </button>
      </div>

      {/* Staff Table */}
      {loading ? (
        <p>Loading...</p> // Show loading state
      ) : error ? (
        <p className="text-red-500">{error}</p> // Show error message
      ) : (
        <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4">Sl.No</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Position</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(staffs) && staffs.length > 0 ? (
                staffs.map((staffMember, index) => (
                  <tr
                    key={staffMember._id}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{staffMember.userName}</td>
                    <td className="p-4">{staffMember.role}</td>
                    <td className="p-4">{staffMember.email}</td>
                    <td className="p-4 flex space-x-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(staffMember)}
                        className="flex items-center bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                      >
                        <AiFillEdit size={16} className="mr-1" />
                        Edit
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(staffMember._id)}
                        className="flex items-center bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                      >
                        <AiFillDelete size={16} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this staff member?"
      />
    </div>
  );
};

export default StaffList;
