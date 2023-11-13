import express from "express";
import { countByCity, createHotel, deleteHotel, getAllHotel, getAllType, getHotel, updatedHotel } from "../controllers/hotelsContollers.js";
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

// count by city
router.get('/countByCity', countByCity)


router.get('/countByType', getAllType)


export default router