import express from "express";
import { countByCity, createHotel, deleteHotel, getAllHotel, getHotel, updatedHotel } from "../controllers/hotelsContollers.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create hotel
router.post('/', verifyAdmin , createHotel)

// update hotel
router.put('/:id', verifyAdmin , updatedHotel)

// delete hotel
router.delete('/:id', verifyAdmin , deleteHotel)

// get hotel
router.get('/find/:id', getHotel)

// get all hotel
router.get('/', getAllHotel)
router.get('/countByCity', countByCity)
router.get('/countByType', getAllHotel)


export default router