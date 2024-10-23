import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import LibraryList from './LibraryList';
import FeesList from './FeesList';

const ViewStudent = () => {
  const navigate = useNavigate();

  // Get the student data from React Router's location state
  const { state: student } = useLocation();

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">No student data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 pt-44">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
        >
          <AiOutlineArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Student Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            {student.firstName} {student.lastName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {/* Age */}
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-lg text-gray-700 font-semibold">{student.age}</p>
            </div>

            {/* Class */}
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Class</p>
              <p className="text-lg text-gray-700 font-semibold">{student.class}</p>
            </div>

            {/* Email */}
            <div className="col-span-2 border-b pb-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg text-gray-700 font-semibold">{student.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => navigate(`/students/edit/${student._id}`, { state: student })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
            >
              Edit Student
            </button>
            <button
              onClick={() => navigate('/student-list')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded transition"
            >
              Go to Student List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
