import jwt from "jsonwebtoken";
import { userModel } from "../models/index.js";

export const verifyToken = async (req, res, next) => {
  
  try {
    const token =
      req.cookies?.token ||
      req.headers["authorization"]?.split(" ")[1];
    console.log("token",token);
    console.log("Cookies:", req.cookies);
      

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
        isAuthenticated: false,
      });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch the role and attach it to the request
    const { role } = await userModel.findById(user.id).select("role");

    req.user = {
      id: decodedToken.id,
      role,
    };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
