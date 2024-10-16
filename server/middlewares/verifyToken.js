import jwt from "jsonwebtoken";
import { userModel } from "../models/index.js";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers['Authorization']?.split(' ')[1]||req.headers['authorization']?.split(' ')[1];
  console.log("token : ",token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, Authorization denied",
      isAuthenticated: false,
    });
  }

  try {
    // Verify the token using the secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedToken.id);
    console.log("user", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const role = await userModel.findById(user.id).select('role')

    // Attach both decoded user and role to the request
    req.user = {
      id: decodedToken.id,
      role: role.role // Make sure the role is attached here
    };

    next();
  } catch (err) {
    console.log("Token Verification Error: ", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};