// import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  // ✅ Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/checkAuth"); // ✅ API call to check auth
        if (res.status === 200) {
          navigate("/"); // ✅ Redirect to homepage if already logged in
        }
      } catch (error) {
        toast.error("User not authenticated");
        // console.log("User not authenticated:", error.response?.data?.message);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]); // ✅ Runs only once when the component mounts
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      <h1 className="text-3xl font-bold">Welcome to DormEase</h1>
      <p className="text-gray-300 mt-2">Find & List PGs Easily</p>

      <div className="mt-6 space-y-4">
        <Link to="/add-pg" className="block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-center">
          Add a PG for Rent
        </Link>
        <Link to="/pg-list" className="block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded text-center">
          Search a PG Near Your College
        </Link>
      </div>
    </div>
  );
};

export default Home;
