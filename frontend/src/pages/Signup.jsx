import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct import
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "", // ✅ Changed from "name" to "fullName"
    email: "",
    password: "",
    college: "",
  });

  const navigate = useNavigate(); // ✅ useNavigate hook

  // ✅ Check authentication on component mount
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axiosInstance.get("/auth/checkAuth"); // ✅ API call to check auth
          if (res.status === 200) {
            toast.success("Already logged in!");
            navigate("/"); // ✅ Redirect to homepage if already logged in
          }
        } catch (error) {
          console.log("User not authenticated:", error.response?.data?.message);
        }
      };
  
      checkAuth();
    }, [navigate]); // ✅ Runs only once when the component mounts

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      toast.success('Account Created Succesfully!');

      localStorage.setItem(formData.email,formData.college);
      localStorage.setItem("currentUser",formData.email);
      localStorage.setItem("userName",res.data.fullName);

      // alert(res.data.message); 
      navigate("/login"); // ✅ Corrected navigation
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
        <h1 className="text-3xl font-bold text-white text-center">Join DormEase</h1>
        <p className="text-gray-400 mt-2 text-center">Create an account to get started</p>

        <form onSubmit={handleSignup} className="mt-6 flex flex-col space-y-4">
          <input
            type="text"
            name="fullName" // ✅ Changed "name" to "fullName"
            placeholder="Full Name"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="college"
            placeholder="Nearby/Your College Name"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.college}
            onChange={handleChange}
            required
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold">
            Sign Up
          </button>
        </form>

        {/* Already have an account? Login Button */}
        <button
          onClick={() => navigate("/login")} // ✅ Corrected navigation
          className="mt-4 w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-center"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
