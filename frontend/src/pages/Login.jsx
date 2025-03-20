import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/checkAuth");
        if (res.status === 200) {
          toast.success("Already logged in!");
          navigate("/");
        }
      } catch (error) {
        console.log("User not authenticated:", error.response?.data?.message);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      // ✅ Store user details in localStorage
      localStorage.setItem("currentUser", email);
      localStorage.setItem(email, res.data.college); // Store college for this user
      localStorage.setItem("userName", res.data.fullName);
      localStorage.setItem("UserID",res.data._id);

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>
      <div className="absolute w-64 h-64 bg-green-600 rounded-full blur-3xl opacity-30 bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2"></div>

      {/* Card Container */}
      <div className="relative z-10 bg-gray-800 p-10 rounded-2xl shadow-2xl w-[450px]">
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome to DormEase
        </h1>
        <p className="text-gray-400 mt-2 text-center">Login to continue</p>

        <form onSubmit={handleLogin} className="mt-6 flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>
        <div className="flex justify-around">
          {/* New User? Signup Button */}
        <button
          onClick={() => navigate("/signup")}
          className="mt-4 w-auto px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-center"
        >
          New User? Signup
        </button>
        {/* Forgot Password */}
        <button
          onClick={() => navigate("/forgot-password")}
          className="mt-4 w-auto px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-center"
        >
          Forgot Password?
        </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
