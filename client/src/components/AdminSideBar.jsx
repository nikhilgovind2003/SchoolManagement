import React from 'react';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li><Link to="/" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link></li>
          <li><Link to="/fees-history" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Fees History</Link></li>
          <li><Link to="/library-history" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Library History</Link></li>
          <li><Link to="/recent-chats" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Chats</Link></li>
          <li><Link to="/add-student" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Add Student</Link></li>
          <li><Link to="/add-staff" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Add Staff</Link></li>
          <li><Link to="/add-librarian" className="text-left block py-2 px-4 rounded hover:bg-gray-700">Add Librarian</Link></li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSideBar;
