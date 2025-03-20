import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PgList from "./pages/PgList";
import AddPG from "./pages/AddPG";
import ResidentsList from "./pages/ResidentsList";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/Chat";
import ForgotPassword from "./pages/ForgotPassword";

function App() {  

  return (
    <div>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-pg" element={<AddPG />} />
        <Route path="/pg-list" element={<PgList />} />
        <Route path="/residents-list" element={<ResidentsList />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/chat/:receiverId/:receiverName" element={<Chat />} />


      </Routes> 
      <Toaster />
    </div>
  );
}

export default App;
