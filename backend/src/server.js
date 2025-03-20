import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import pgRoutes from "./routes/pgRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors({
  origin: "http://localhost:5173", // Replace with frontend URL
  credentials: true
}));

    
app.use("/api/auth", authRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  connectDB();
});
