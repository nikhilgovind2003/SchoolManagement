import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStudents } from "../../redux/features/student/studentSlice";
import { fetchFeesRecords } from "../../redux/features/fees/feesSlice";
import StudentList from './../StudentList';
import Student from './../../../../server/models/studentModel';

const StaffDashboard = () => {
  const user = useSelector((state) => state?.userAuth?.userInfo || {});
  const { fees } = useSelector((state) => state.fees.feesRecords || []); // Fees data from Redux
  const students = useSelector((state) => state.students.students || []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchFeesRecords());
  }, [dispatch]);

  let amount = 0;
  Array.isArray(fees) && fees.filter((fee) => (amount += fee.amount));


  return (
    <div className=" py-24 px-44 min-h-screen bg-gray-100">
      <div className="grid mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="bg-white shadow-lg text-center border-2 border-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Students</h2>
            <p className="text-2xl text-blue-600 font-bold">
              {students.length}
            </p>{" "}
            {/* Adjust this if you have fees data */}
          </div>
          <div className="bg-blue-600 text-white text-center py-2">
            <span className="font-medium">Overview of all fees collected</span>
          </div>
        </div>
      </div>




      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            Welcome, {user.userName}!
          </h1>
          <p className="text-blue-200 mt-2">Here’s your dashboard overview.</p>
        </div>

        {/* User Info Section */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              User Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Username:</span>
              <span className="text-gray-800">{user.userName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Role:</span>
              <span className="uppercase text-blue-600 font-semibold">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
