import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
    try {
        console.log("Received Album Data:", req.body);
        console.log("Received Image File:", req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image upload failed" });
        }

        const { name, desc, bgColour } = req.body;

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
            folder: "albums",
            resource_type: "image",
        });

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url, // Cloudinary image URL
        };

        const album = new albumModel(albumData); // FIXED: Correct instantiation
        await album.save();

        res.json({ success: true, message: "Album Added", album });

    } catch (error) {
        console.error("Error adding album:", error); // FIXED: Logging the error
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });
    } catch (error) {
        console.error("Error listing albums:", error); // FIXED: Logging the error
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album Removed" });
    } catch (error) {
        console.error("Error removing album:", error); // FIXED: Logging the error
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addAlbum, listAlbum, removeAlbum };