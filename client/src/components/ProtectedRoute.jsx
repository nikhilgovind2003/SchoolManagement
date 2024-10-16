import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.userAuth.isAuthenticated);
  console.log(isLoggedIn);

  isLoggedIn === true ? <AdminDashboard /> : <Navigate to="/login" />;
  return null;
};

export default ProtectedRoute;
