import React, { useState, useEffect } from "react";

const StudentBookPage = ({ student }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock borrowed books data (replace with API call)
    const mockBorrowedBooks = [
      {
        id: 1,
        name: "The Great Gatsby",
        borrowDate: "2024-09-01",
        returnDate: "2024-10-01",
        status: "Borrowed",
      },
      {
        id: 2,
        name: "1984",
        borrowDate: "2024-08-15",
        returnDate: "2024-09-15",
        status: "Overdue",
      },
      {
        id: 3,
        name: "To Kill a Mockingbird",
        borrowDate: "2024-10-10",
        returnDate: "2024-11-10",
        status: "Borrowed",
      },
    ];

    setBorrowedBooks(mockBorrowedBooks);
  }, []);

  const handleRenewRequest = (bookId) => {
    console.log(`Renew request for book ID: ${bookId}`);
  };

  const handleReturn = (bookId) => {
    console.log(`Return request for book ID: ${bookId}`);
  };

  // Filtered books based on search term
  const filteredBooks = borrowedBooks.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBooks = borrowedBooks.length;
  const overdueBooks = borrowedBooks.filter(
    (book) => book.status === "Overdue"
  ).length;

  return (
    <div className="container mx-auto p-6">
      {/* Profile Section */}
      <div className="flex items-center mb-6 space-x-4">
        <img
          src={"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold">{`${student.firstName} ${student.lastName}`}</h1>
          <p className="text-gray-600">Email: {student.email}</p>
          <p className="text-gray-600">Student ID: {student.studentId}</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex justify-between mb-6 bg-gray-100 p-4 rounded-lg shadow-lg">
        <div>
          <p className="text-gray-700">Total Borrowed Books:</p>
          <h2 className="text-xl font-bold">{totalBooks}</h2>
        </div>
        <div>
          <p className="text-gray-700">Overdue Books:</p>
          <h2 className="text-xl font-bold text-red-600">{overdueBooks}</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table of Borrowed Books */}
      <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4">Book Name</th>
              <th className="text-left p-4">Borrow Date</th>
              <th className="text-left p-4">Return Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="p-4">{book.name}</td>
                  <td className="p-4">{book.borrowDate}</td>
                  <td className="p-4">{book.returnDate}</td>
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
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
                      onClick={() => handleRenewRequest(book.id)}
                    >
                      Renew
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                      onClick={() => handleReturn(book.id)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Book Recommendations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Mock recommended books (could be fetched from an API) */}
          {[
            "Pride and Prejudice",
            "Moby Dick",
            "The Catcher in the Rye",
          ].map((book, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="font-bold">{book}</h3>
              <p className="text-gray-600">by Author</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mt-4">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentBookPage;
