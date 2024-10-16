import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';

const AdminNav = () => {

  const dispatch = useDispatch()
const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }



  return (
    <nav className="bg-gray-800 p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Admin Panel</Link>
        </div>
        <ul className="flex space-x-6 items-center justify-center text-white">
          <li>
            <Link to="/" className="hover:text-gray-400">Dashboard</Link>
          </li>
          <li>
            <Link to="/fees-history" className="hover:text-gray-400">Fees History</Link>
          </li>
          <li>
            <Link to="/library-history" className="hover:text-gray-400">Library History</Link>
          </li>
          <li>
            <Link to="/add-student" className="hover:text-gray-400">Add Student</Link>
          </li>
          <li>
            <Link to="/add-staff" className="hover:text-gray-400">Add Staff</Link>
          </li>
          <li>
            <Link to="/add-librarian" className="hover:text-gray-400">Add Librarian</Link>
          </li>
          <li>
            <button onClick={handleLogout} to="/login" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-200">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
