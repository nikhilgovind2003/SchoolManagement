
const FeesHistory = () => {
  const feesRecords = [
    { id: 1, studentId: 'S001', feeType: 'Tuition', amount: 500, paymentDate: '2023-10-01', status: 'Paid' },
    { id: 2, studentId: 'S002', feeType: 'Library', amount: 50, paymentDate: '2023-10-05', status: 'Pending' },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Fees History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-red-100">
            <th className="py-2 px-4 text-left">Student ID</th>
            <th className="py-2 px-4 text-left">Fee Type</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Payment Date</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {feesRecords.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="py-2 px-4">{record.studentId}</td>
              <td className="py-2 px-4">{record.feeType}</td>
              <td className="py-2 px-4">${record.amount}</td>
              <td className="py-2 px-4">{record.paymentDate}</td>
              <td className={`py-2 px-4 ${record.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeesHistory;
