import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getMenu } from '../utils/Menu';
import { useSelector } from 'react-redux';

const AdminSideBar = () => {
const navigate = useNavigate()
  const [menu, setMenu] = useState([]);
  const { userInfo, isAuthenticated } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (userInfo && isAuthenticated) setMenu(getMenu(userInfo.role));
    else setMenu([]);
  }, [userInfo, isAuthenticated]);

  return (
    <div className="w-40 pt-24 bg-gray-700 text-white h-full fixed">
      <div className="font-bold">
        <ul className="">
             {menu.map((item, index) => (
             <li
             key={index}
             onClick={() => navigate(item.path)} // Correct use of navigate
             className="hover:bg-red-500 p-4 cursor-pointer border-b-2 border-b-gray-600" // Added cursor pointer for better UX
           >        {/* Make sure to use <li> for each item */}
                <p to={item.path}>{item.displayName}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
