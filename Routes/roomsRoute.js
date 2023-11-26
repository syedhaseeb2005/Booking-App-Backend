import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoomAvailability, updatedRoom } from "../controllers/roomsControllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create room
router.post('/:hotelid', verifyAdmin , createRoom)

// update room
router.put('/:id', verifyAdmin , updatedRoom)

// availability
router.put('/availability/:id', updateRoomAvailability)

// delete rooml
router.delete('/:id/:hotelid', verifyAdmin , deleteRoom)

// get room
router.get('/:id', getRoom)

// get all room
router.get('/', getAllRoom)

export default router