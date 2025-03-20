import mongoose from "mongoose";

const pgSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true,
    },
    rent:
    {
        type: Number,
        required: true
    },
    contact:
    {
        type: String,
        required: true
    },
    college:
    {
        type: String,
        required: true
    },
    residents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

});

export default mongoose.model("PG", pgSchema);