import { useSelector } from 'react-redux';

const LibrarianDashboard = () => {
  const user = useSelector((state) => state?.userAuth?.userInfo || {});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome, {user.userName}!</h1>
          <p className="text-blue-200 mt-2">Here’s your dashboard overview.</p>
        </div>

        {/* User Info Section */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">User Details</h2>
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

export default LibrarianDashboard;
