import { userModel } from "../models/index.js";
import bcrypt from "bcrypt"
import { generateToken } from './../utils/generateToken.js';

const cookieOptions = {
  httpOnly: false,
  secure: false, // Set to true in production with HTTPS
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

// Temporary storage for OTPs
const otpStore = {}; // This is a simple in-memory store. Replace it with Redis or similar for production.

// // Generate OTP and Send to Email
// export const generateOtpAndSend = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Generate a new 6-digit numeric OTP
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//       lowerCaseAlphabets: false,
//     });

//     // Store OTP and email temporarily
//     otpStore[email] = otp;

//     // Send the OTP to the user's email
//     await verificationEmail({ userEmail: email, otp });

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent to your email",
//     });
//   } catch (error) {
//     console.error("OTP generation error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Registration function that includes OTP verification

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

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
      password: await bcrypt.hash(password, 10),
      isVerified: true,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // // Remove OTP from store after successful registration
    // delete otpStore[email];

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

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    const userWithoutPassword = await userModel.findById(user._id).select(
      "-password"
    );
    // userWithoutPassword.isActive = true;
    // await userWithoutPassword.save();


    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .cookie(
        "user",
        { ...userWithoutPassword, isAuthenticated: true },
        cookieOptions
      )
      .json({
        success: true,
        message: "Login Successfully!",
        user,
        token
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     const token = uuidv4();
//     user.forgotPasswordToken = token;
//     user.forgotPasswordExpiry = Date.now() + 300000;
//     await user.save();
//     const response = await sendResetPasswordEmail({
//       userEmail: user.email,
//       token,
//       userId: user._id,
//     });
//     console.log(response);
//     return res.status(200).json({
//       success: true,
//       message: "Check your email",
//       response,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { user, token } = req.query; // Correctly accessing req.query
//     console.log("query", req.query); // Log req.query to verify inputs

//     const { password } = req.body;
//     if (!password) {
//       return res.status(400).json({
//         success: false,
//         message: "Password is required",
//       });
//     }
//     if (!user || !token) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Link",
//       });
//     }
//     const userInfo = await userModel.findById(user);
//     if (!userInfo) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     if (
//       token === userInfo.forgotPasswordToken &&
//       userInfo.forgotPasswordExpiry > Date.now()
//     ) {
//       userInfo.password = await bcrypt.hash(password, 10);
//       userInfo.forgotPasswordToken = undefined;
//       userInfo.forgotPasswordExpiry = undefined;
//       await userInfo.save();
//       return res.status(200).json({
//         success: true,
//         message: "Password updated successfully",
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

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

// export const changePassword = async (req, res) => {
//   try {
//     const { newPassword, password } = await req.body;
//     if (!newPassword || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     const user = await userModel.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();
//     return res.status(200).json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
