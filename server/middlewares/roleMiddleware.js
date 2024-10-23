// Middleware to restrict access based on roles
export const authorizedRoles = (...roles) => {
  console.log("Allowed Roles:", roles); // Logs allowed roles for this route

  return (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Unauthorized role' });
    }
    next(); // User has required role, proceed to the next middleware or route
  };
};
