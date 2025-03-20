import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    college:
    {
        type: String,
        required: true
    },
    forgotPasswordOtp:
    {
        type: Number,
        default: null
    },
    forgotPasswordOtpExpiry:
    {
        type: Number,
        default: null
    },
    


},{timestamps:true});

export default mongoose.model("User", userSchema);