import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import { axiosInstance } from "../lib/axios";

const Chat = () => {
  const { receiverId, receiverName } = useParams();
  const navigate = useNavigate();
  const currentUserID = localStorage.getItem("UserID");

  // Redirect user if ID is missing
  useEffect(() => {
    if (!currentUserID) {
      console.error("User ID is missing, redirecting...");
      navigate("/login");
    }
    if (!receiverId) {
      console.error("Receiver ID is missing");
    }
  }, [currentUserID, receiverId, navigate]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages
  useEffect(() => {
    if (!currentUserID || !receiverId) return;

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/messages/${currentUserID}/${receiverId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [receiverId, currentUserID]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axiosInstance.post("/messages/send", {
        sender: currentUserID,
        receiver: receiverId,
        message: newMessage,
      });

      setMessages((prev) => [...prev, { sender: currentUserID, receiver: receiverId, message: newMessage }]);
      setNewMessage("");
    } catch (error) {
      toast.error("Failed to send message!");
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-96 p-6 rounded-xl shadow-lg">
        {/* Chat Header */}
        <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
          <h2 className="text-lg font-bold text-white">Chat with {receiverName || "Receiver"}</h2>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-red-500">✖</button>
        </div>

        {/* Chat Messages */}
        <div className="h-64 overflow-auto bg-gray-800 p-2 rounded-lg flex flex-col">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md mb-1 text-sm max-w-[50%] ${
                  msg.sender === currentUserID
                    ? "bg-blue-600 text-white self-end text-right"  // Sent message on right
                    : "bg-gray-600 text-white self-start text-left" // Received message on left
                }`}
              >
                {msg.message}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No messages yet.</p>
          )}
        </div>

        {/* Message Input */}
        <div className="mt-2 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 bg-gray-700 text-white rounded-md text-sm"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
            Send
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Chat;
