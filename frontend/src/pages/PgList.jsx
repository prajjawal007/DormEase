import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const PGList = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [residents, setResidents] = useState([]);
  const [showResidentsModal, setShowResidentsModal] = useState(false);
  const [currentPgId, setCurrentPgId] = useState(null);
  // const [confirmedPgId, setConfirmedPgId] = useState(null);

  const navigate = useNavigate();

  const currentUser = localStorage.getItem("currentUser");
  const userCollege = localStorage.getItem(currentUser);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pgs/${encodeURIComponent(userCollege)}`);
        const data = await response.json();
        if (response.ok) {
          setPgs(data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching PGs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPGs();
  }, []);

  const handleConfirmResidence = async (pgId) => {
    try {
      const authResponse = await axiosInstance.get("/auth/checkAuth");
      const userId = authResponse.data._id;

      if (!userId) {
        toast.error("Please login to confirm residence");
        return;
      }

      await axiosInstance.post("/pgs/confirm-residence", { userId, pgId });
      toast.success("Residence confirmed successfully!");
      navigate("/pg-list");
    } catch (error) {
      toast.error("User is already the resident of this PG!");
    }
  };

  const fetchResidents = async (pgId) => {
    try {
      const authResponse = await axiosInstance.get("/auth/checkAuth");
      const currentUserId = authResponse.data._id; // Get the current user's ID

      const response = await axiosInstance.get(`/pgs/${pgId}/residents`);
      if (response.status === 200) {
        const filteredResidents = response.data.residents.filter(
          (resident) => resident._id !== currentUserId
        );
        setResidents(filteredResidents);
        setCurrentPgId(pgId);
        setShowResidentsModal(true);
      } else {
        toast.error("Failed to fetch residents");
      }
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden p-6">
      <div className="relative z-10 w-full max-w-6xl bg-gray-800 p-10 rounded-2xl shadow-2xl">
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-40 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-300"
        >
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-white text-center">
          PGs Near {userCollege}
        </h1>
        <p className="text-gray-400 mt-2 text-center">
          Find and confirm your residence easily
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-400">Loading PGs...</p>
          ) : pgs.length > 0 ? (
            pgs.map((pg) => (
              <div
                key={pg._id}
                className="bg-gray-900 p-6 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold mt-4 text-blue-400">
                  {pg.name}
                </h2>
                <p className="text-gray-400">{pg.address}</p>
                <p className="text-gray-400">Rent: ₹{pg.rent}</p>
                <p className="text-gray-400">Contact: {pg.contact}</p>
                <button
                  onClick={() => handleConfirmResidence(pg._id)}
                  className="mt-4 w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Confirm Residence
                </button>
                <button
                  onClick={() => fetchResidents(pg._id)}
                  className="mt-4 w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-300"
                >
                  Connect with current residents
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No PGs found near {userCollege}.
            </p>
          )}
        </div>

        {/* Modal to display residents */}
        {showResidentsModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-gray-900 p-6 rounded-xl w-96">
              <h2 className="text-2xl font-bold text-white">Residents of PG</h2>
              <ul className="mt-4 text-gray-400">
                {residents.map((resident) => (
                  <li
                    key={resident._id}
                    className="py-2 flex justify-between items-center"
                  >
                    {resident.fullName}
                    <button
                      onClick={() => navigate(`/chat/${resident._id}/${resident.fullName}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue700 text-white rounded-lg font-semibold" 
                    >
                      Chat
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowResidentsModal(false)}
                className="mt-4 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGList; 