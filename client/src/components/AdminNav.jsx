import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { useEffect } from "react";
import { getMenu } from "../utils/Menu";
import {LogOut } from 'lucide-react'
const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, isAuthenticated } = useSelector((state) => state.userAuth);

  const [menu, setMenu] = useState([]);

  
  useEffect(() => {
    if (userInfo && isAuthenticated) setMenu(getMenu(userInfo.role));
    else setMenu([]);
  }, [userInfo, isAuthenticated]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenu([]);
  };

  return (
    <nav className=" top-0 bg-gray-800 py-4 px-44 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link className=" capitalize" to={`/${userInfo.role}-dashboard`}>{userInfo.role} Panel</Link>
        </div>
        <ul className="flex space-x-6 items-center justify-center gap-4 text-white">
          {userInfo.userName}
            <button
              onClick={handleLogout}
              to="/"
              className=" flex items-center justify-between gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
              <LogOut />
            </button>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
