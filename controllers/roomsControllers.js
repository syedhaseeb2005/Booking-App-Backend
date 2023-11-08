import Rooms from "../models/roomsModel.js";
import Hotels from "../models/hotelsmodel.js";

// create a room
export const createRoom = async (req, res, next) => {
        const hotelId = req.params.hotelid;
        const newRoom = new Rooms(req.body);

        try {
            const saveRooms = await newRoom.save();
            try {
                await Hotels.findByIdAndUpdate(hotelId, { $push: { rooms: saveRooms._id } });
                res.status(201).json(saveRooms);
            } catch (error) {
                next(error);
            }
            res.status(200).send({
                staus : 'success',
                message : 'Your room is created',
                roomdb : saveRooms
            })
        } catch (error) {
            next(error);
        }
    }


// update a room
export const updatedRoom = async (req,res,next) =>{
    try {
        const updatedRoom = await Rooms.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
            ) 
        res.status(200).send({
            status : 'success',
            Message : 'Hotel is updated',
            roomDB : updatedRoom
        })   
    } catch (error) {
        next(error)
    }
}

// delete a room
export const deleteRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    try {
        await Rooms.findByIdAndDelete(req.params.id) 
        try {
            await Hotels.findByIdAndUpdate(hotelId, 
                { $pull: { rooms: req.params.id } 
            });
            res.status(200).send({
                staus : 'success',
                message : "Rooms is Deleted "
            });
        } catch (error) {
            next(error);
        }
        res.status(200).send({
           status : 'success',
           Message : 'Room is deleted',

       })   
    } catch (error) {
       next(error)
   }
}

// get a room
export const getRoom = async (req,res,next) =>{
    try {
        const getRooms = await Rooms.findById(req.params.id) 
        res.status(200).send({
            status : 'success',
            Message : 'Room is get',
            roomDB :   getRooms

        })   
    } catch (error) {
        next(error)
    }
}

// get all room
export const getAllRoom = async (req,res,next) =>{
    try {
        const getallRoom = await Rooms.find() 
        res.status(200).send({
            status : 'success',
            Message : 'All room is get',
            roomDB : getallRoom

        })   
    } catch (error) {
        next(error)
    }
}