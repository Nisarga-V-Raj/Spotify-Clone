import { addSong, listSong, removeSong } from "../controllers/songController.js"; // Ensure lowercase
import express from 'express';
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);
songRouter.get('/list', listSong);
songRouter.delete('/remove', removeSong); // Changed from POST to DELETE

export default songRouter;