import Hotels from "../models/hotelsmodel.js";
import Rooms from "../models/roomsModel.js";
// create a hotel
export const createHotel = async (req,res,next) =>{
    const newHotel = new Hotels(req.body)
    try {
        const savedHotel = await newHotel.save() 
        res.status(200).send({
            status : 'success',
            Message : 'Hotel is created',
            hotelDB : savedHotel

        })   
    } catch (error) {
       next(error)
    }
}

// update a hotel
export const updatedHotel = async (req,res,next) =>{
    try {
        const updateHotel = await Hotels.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
            ) 
        res.status(200).send({
            status : 'success',
            Message : 'Hotel is updated',
            hotelDB : updateHotel
        })   
    } catch (error) {
        next(error)
    }
}

// delete a hotel
export const deleteHotel = async (req,res,next) =>{
    try {
        await Hotels.findByIdAndDelete(req.params.id) 
       res.status(200).send({
           status : 'success',
           Message : 'Hotel is deleted',

       })   
    } catch (error) {
       next(error)
   }
}

// get a hotel
export const getHotel = async (req,res,next) =>{
    try {
        const getHotel = await Hotels.findById(req.params.id) 
        res.status(200).send({
            status : 'success',
            Message : 'Hotel is get',
            hotelDB : getHotel

        })   
    } catch (error) {
        next(error)
    }
}

// get all hotel
export const getAllHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotels.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit || 4);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };


// count by city

export const countByCity = async (req,res,next) =>{
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotels.countDocuments({city : city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
export const getAllType = async (req,res,next) =>{
    try {
    const hotelCount = await Hotels.countDocuments({type : "hotel"})
    const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
    const resortCount = await Hotels.countDocuments({ type: "resort" });
    const villaCount = await Hotels.countDocuments({ type: "villa" });
    const cabinCount = await Hotels.countDocuments({ type: "cabin" });
    
        res.status(200).json([
            {type : "hotel" , count : hotelCount},
            {type : "apartment" , count : apartmentCount},
            {type : "resort" , count : resortCount},
            {type : "villa" , count : villaCount},
            {type : "cabin" , count : cabinCount},
        ])
    } catch (error) {
        next(error)
    }
}

export const getHotelRooms = async (req,res,next) =>{
    try {
        const hotel = await Hotels.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Rooms.findById(room) 
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}