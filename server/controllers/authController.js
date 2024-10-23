import { userModel } from "../models/index.js";
import bcrypt from "bcrypt"
  import { generateToken } from './../utils/generateToken.js';

  const cookieOptions = {
    httpOnly: false,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };

export const register = async (req, res) => {
  try {
    const { userName, email, password , role} = req.body;

    // Check if all required fields are provided
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // OTP is correct, proceed with registration
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create a new user
    user = await userModel.create({
      userName,
      email,
      role,
      password: await bcrypt.hash(password, 10),
      isVerified: true,
    });

    // Generate JWT token
    const token = generateToken(user._id);


    return res
      .status(201)
      .cookie("token", token, cookieOptions)
      .cookie(
        "user",
        JSON.stringify({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          isVerified: user.isVerified,
          // isActive: user.isActive,
          isAuthenticated: true,
        }),
        cookieOptions
      )
      .json({
        success: true,
        message: "Registration successful!",
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    // Find user by email
    const user = await userModel.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(password);
    console.log(user.password);
    

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const token = generateToken(user._id);

    // Select user without password
    const userWithoutPassword = await userModel.findById(user._id).select("-password");

    // Set cookies and return response
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .cookie("user", { ...userWithoutPassword, isAuthenticated: true }, cookieOptions)
      .json({
        success: true,
        message: "Login Successfully!",
        user: userWithoutPassword, // Return user without password
        token
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  try {
    console.log(req.user);
    const user = await userModel.findById(req?.user?._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // user.isActive = false;
    // await user.save();
    
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()), // Expire the cookie immediately
      })
      .cookie("connect.sid", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .cookie("user", "", {
        httpOnly: true,
        expires: new Date(0),
      });
    return res.status(200).json({
      success: true,
      message: "User successfully logged out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};