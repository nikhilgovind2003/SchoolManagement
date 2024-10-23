import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, allowedRoles}) => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const {isAuthenticated} = useSelector((state) => state.userAuth);
   

  const isUserHasRole = userInfo && Array.isArray(allowedRoles) && allowedRoles.includes(
    userInfo.role
  )
  
  if (!userInfo || !isAuthenticated) {
    return <Navigate to="/" />
  }
  

  if (userInfo && !isUserHasRole) {
    
    return <Navigate to="/" />
  }

  return children;
};

export default PrivateRoute;
