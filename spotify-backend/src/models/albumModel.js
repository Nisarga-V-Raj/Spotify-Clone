import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    bgColour: { type: String, required: true, trim: true },
    image: { type: String, required: true }
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;