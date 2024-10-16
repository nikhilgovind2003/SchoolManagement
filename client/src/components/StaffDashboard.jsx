import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Mock borrowed books data (replace with API call)
    const mockBorrowedBooks = [
      {
        id: 1,
        name: "The Great Gatsby",
        borrower: "John Doe",
        dueDate: "2024-10-01",
        status: "Borrowed",
      },
      {
        id: 2,
        name: "1984",
        borrower: "Jane Smith",
        dueDate: "2024-09-15",
        status: "Overdue",
      },
      {
        id: 3,
        name: "To Kill a Mockingbird",
        borrower: "Michael Brown",
        dueDate: "2024-11-10",
        status: "Borrowed",
      },
    ];

    setBorrowedBooks(mockBorrowedBooks);
  }, []);

  const handleNotify = (bookId) => {
    console.log(`Send notification for overdue book ID: ${bookId}`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Total Books</h2>
          <p className="text-2xl">500</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Books Borrowed</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Overdue Books</h2>
          <p className="text-2xl">15</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Total Students</h2>
          <p className="text-2xl">300</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Borrowed Books</h1>
        <div className="space-x-2">
          <Link to="/newbook" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            Add New Book
          </Link>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
            Manage Books
          </button>
        </div>
      </div>

      {/* Borrowed Books Table */}
      <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4">Book Name</th>
              <th className="text-left p-4">Borrower</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="p-4">{book.name}</td>
                  <td className="p-4">{book.borrower}</td>
                  <td className="p-4">{book.dueDate}</td>
                  <td
                    className={`p-4 font-semibold ${
                      book.status === "Overdue"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {book.status}
                  </td>
                  <td className="p-4">
                    {book.status === "Overdue" && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                        onClick={() => handleNotify(book.id)}
                      >
                        Send Reminder
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Notifications Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>Reminder: There are 15 overdue books. Please send notifications to students.</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
