import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AddPG = () => {
  const [pgData, setPgData] = useState({
    name: "",
    address: "",
    rent: "",
    contact: "",
    college: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPgData({ ...pgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/pgs", pgData);
      console.log(res.data);
      toast.success("PG added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding PG:", error.response?.data);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
      {/* Background Shapes (No Overflow) */}
      <div className="absolute w-[30vw] h-[30vw] max-w-72 max-h-72 bg-blue-500 rounded-full blur-3xl opacity-30 inset-0 m-auto"></div>
      <div className="absolute w-[35vw] h-[35vw] max-w-80 max-h-80 bg-green-500 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>
      <div className="absolute w-[25vw] h-[25vw] max-w-64 max-h-64 bg-teal-400 rounded-full blur-3xl opacity-30 top-10 left-10"></div>

      {/* Card Container */}
      <div className="relative z-10 bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white text-center">Add a PG for Rent</h1>
        <p className="text-gray-400 mt-2 text-center">Fill in the details below</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="PG Name"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <input
            type="number"
            name="rent"
            placeholder="Rent (₹)"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="college"
            placeholder="College Name"
            className="border border-gray-600 bg-gray-900 p-3 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition duration-300 w-full">
            Add PG
          </button>
        </form>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AddPG;
