import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../config/utils.js";
import { registerTemplate } from "../config/registerTemplate.js";
import sendEmail from "../config/sendEmail.js";
import { sendOtpTemplate } from "../config/sendOtpTemplate.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, password, college } = req.body;
  try {
    if (!fullName || !email || !password || !college) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }
    //if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ messege: "Email already exists" });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      college: college,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      const email = newUser.email;
      const subject = "Welcome to DormEase!";
      const html = registerTemplate({ username: newUser.fullName });
      await sendEmail(email, subject, html);

      res.status(201).json({
        message: "Account created Succesfully!",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        college: newUser.college,
      });
    } else {
      return res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    //compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    //generate Token
    generateToken(user._id, res);
    res.status(200).json({
      message: "Logged in successfully",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      college: user.college,
    });
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", async (req, res) => {
  // Implement logout logic here
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/checkAuth", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in Check Auth Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiryTime = Date.now() + 300000; //5 min

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      forgotPasswordOtp: otp,
      forgotPasswordOtpExpiry: expiryTime,
    });

    const subject = "OTP for password reset";
    const text = sendOtpTemplate({ otp });
    await sendEmail(email, subject, text);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Check your email for OTP",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error sending OTP",
      details: error.message,
    });
  }
});

router.post("/verifyForgotPasswordOtp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    console.log("Received data:", { email, otp }); // Debugging output
    
    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required fields: email, otp.",
        error: true,
        success: false,
      });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        message: "Email not registered",
        error: true,
        success: false,
      });
    }
    
    console.log("Stored OTP:", user.forgotPasswordOtp, "Received OTP:", otp);

    // Check if OTP has expired
    if (Date.now() > user.forgotPasswordOtpExpiry) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }

    // Convert both to string for comparison
    if (user.forgotPasswordOtp !== Number(otp)) {
      return res.status(400).json({
        message: "Wrong OTP",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error); // Debugging output
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error verifying OTP",
      details: error.message,
    });
  }
});

router.post("/resetPassword",async(req,res)=>{
  try {
    const { email, otp, newPassword } = req.body;
    if(!email || !otp || !newPassword){
        return res.status(400).json({
            message : "Provide required field email, otp, newPassword.",
            error : true,
            success : false
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message : "Email not registered",
            error : true,
            success : false
        })
    }
    const currentTime = Date.now();
    if(currentTime > user.forgotPasswordOtpExpiry){
        return res.status(400).json({
            message : "OTP expired",
            error : true,
            success : false
        })
    }

    if(user.forgotPasswordOtp !== Number(otp)){
        return res.status(400).json({
            message : "Wrong OTP",
            error : true,
            success : false
        })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(user._id,{
        password: hashedPassword,
        forgotPasswordOtp: null,
        forgotPasswordOtpExpiry: null
    })
    return res.status(200).json({
        message : "Password reset successfully",
        error : false,
        success : true
    })
} catch (error) {
    return res.status(500).json({
                success: false,
                error: true,
                message: 'Error resetting password',
                details: error.message
    });
}})

export default router;
