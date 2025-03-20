import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/auth/forgot-password`, { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setStep(2);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
        console.log("Sending OTP:", otp, "Email:", email); // Debugging line
        
        const response = await axiosInstance.post(`/auth/verifyForgotPasswordOtp`, { 
            email, 
            otp: Number(otp)  // Ensure OTP is sent as a number
        });

        if (response.data.success) {
            toast.success(response.data.message);
            setStep(3);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error response:", error.response);  // Debugging line
        toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/auth/resetPassword`, { email, otp, newPassword });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>
      <div className="absolute w-64 h-64 bg-green-600 rounded-full blur-3xl opacity-30 bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 bg-gray-800 p-10 rounded-2xl shadow-2xl w-[450px]">
        <h1 className="text-3xl font-bold text-white text-center">Forgot Password</h1>
        <p className="text-gray-400 mt-2 text-center">Reset your password in a few steps</p>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-6 flex flex-col space-y-4">
            <input type="email" placeholder="Email" className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="mt-6 flex flex-col space-y-4">
            <input type="number" placeholder="Enter OTP" className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-6 flex flex-col space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type={showPassword ? "text" : "password"} placeholder="New Password" className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;