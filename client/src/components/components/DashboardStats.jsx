
const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-blue-500 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold">Total Students</h3>
        <p className="text-3xl">120</p>
      </div>
      <div className="bg-green-500 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold">Total Books</h3>
        <p className="text-3xl">450</p>
      </div>
      <div className="bg-red-500 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold">Fees Collected</h3>
        <p className="text-3xl">$25,000</p>
      </div>
      <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold">Books Borrowed</h3>
        <p className="text-3xl">180</p>
      </div>
    </div>
  );
};

export default DashboardStats;
