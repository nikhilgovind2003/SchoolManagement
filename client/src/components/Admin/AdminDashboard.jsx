import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryRecords } from "../../redux/features/library/LibrarySlice";
import { fetchStudents } from "../../redux/features/student/studentSlice";
import { fetchFeesRecords } from "../../redux/features/fees/feesSlice";
import { fetchStaff } from "../../redux/features/staff/staffSlice";

const AdminDashboard = () => {
  const students = useSelector((state) => state.students.students || []);
  const records = useSelector((state) => state.library.records.books || []);
  const staffs = useSelector((state) => state.staff.allStaffs.staffs || []);
  const { fees } = useSelector((state) => state.fees.feesRecords || []); // Fees data from Redux

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaff()); // Fetch staff data on component mount
    dispatch(fetchLibraryRecords());
    dispatch(fetchStudents());
    dispatch(fetchFeesRecords());
  }, [dispatch]);

  let amount = 0;
  console.log(staffs);

  Array.isArray(fees) && fees.filter((fee) => (amount += fee.amount));
  const librarianCount = staffs.filter(
    (staff) => staff.role === "librarian"
  ).length;
  console.log(librarianCount);

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-24 px-44">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card for Total Fees */}
        <div className="bg-white shadow-lg text-center border-2 border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Fees</h2>
            <p className="text-2xl text-blue-600 font-bold">
              {amount} INR
            </p>{" "}
            {/* Adjust this if you have fees data */}
          </div>
          <div className="bg-blue-600 text-white text-center py-2">
            <span className="font-medium">Overview of all fees collected</span>
          </div>
        </div>

        {/* Card for Total Staff */}
        <div className="bg-white shadow-lg rounded-lg text-center border-2 border-gray-300 overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Staff</h2>
            <p className="text-2xl text-blue-600 font-bold">{staffs.length}</p>
          </div>
          <div className="bg-blue-600 text-white text-center py-2">
            <span className="font-medium">All staff members in the system</span>
          </div>
        </div>

        {/* Card for Total Books */}
        <div className="bg-white shadow-lg rounded-lg text-center border-2 border-gray-300 overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Books</h2>
            <p className="text-2xl text-blue-600 font-bold">{records.length}</p>
          </div>
          <div className="bg-blue-600 text-white text-center py-2">
            <span className="font-medium">Count of all books available</span>
          </div>
        </div>

        {/* Card for Total Students */}
        <div className="bg-white shadow-lg rounded-lg text-center border-2 border-gray-300 overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Students
            </h2>
            <p className="text-2xl text-blue-600 font-bold">
              {students.length}
            </p>
          </div>
          <div className="bg-blue-600 text-white text-center py-2">
            <span className="font-medium">All registered students</span>
          </div>
        </div>

        {/* Card for Total Librarians */}
        <div className="bg-white shadow-lg rounded-lg text-center border-2 border-gray-300 overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Librarians
            </h2>
            <p className="text-2xl text-blue-600 font-bold">{librarianCount}</p>
          </div>
          <div className="bg-blue-600 text-white text-center py-2">
            <span className="font-medium">All librarians in the system</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
