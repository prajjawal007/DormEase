import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown
  
  const userName = localStorage.getItem("userName");

  const handleLogout = async () => {
    const currentUser = localStorage.getItem("currentUser");

    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged Out Successfully!");
      
      //clearing localstorage after logout
      localStorage.removeItem("currentUser");
      localStorage.removeItem(currentUser);
      localStorage.removeItem("userName");
      
      navigate("/login"); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Hide Profile & Logout on Login & Signup pages
  const hideAuthButtons =
    location.pathname === "/login" || location.pathname === "/signup";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 px-6 flex items-center backdrop-blur-md bg-gray-900/80 shadow-lg z-100 ${
        hideAuthButtons ? "justify-center" : "justify-between"
      }`}
    >
      {/* Logo (Centered on Login/Signup, Left Otherwise) */}
      <Link className="text-2xl font-bold text-blue-400 hover:text-blue-500 transition">
        DormEase<span className="text-white">🏠</span>
      </Link>

      {/* Desktop Menu */}
      {!hideAuthButtons && (
        <div className="hidden md:flex items-center space-x-6">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-300 hover:text-blue-400 transition flex items-center space-x-2"
            >
              <User size={25} />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center text-white">
                <User size={40} className="mb-2 text-blue-400" />
                <p className="text-lg font-semibold">{userName}</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md flex items-center"
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      {!hideAuthButtons && (
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      )}

      {/* Mobile Menu */}
      {!hideAuthButtons && isOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-800/90 shadow-md md:hidden flex flex-col items-center space-y-4 py-4 z-50">
          {/* Profile Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-300 hover:text-blue-400 transition"
            >
              <User size={24} />
            </button>

            {/* Dropdown Card (Mobile) */}
            {dropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center text-white">
                <User size={40} className="mb-2 text-blue-400" />
                <p className="text-lg font-semibold">{userName}</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md flex items-center"
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
