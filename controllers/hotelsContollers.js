import Hotels from "../models/hotelsmodel.js";

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
export const getAllHotel = async (req,res,next) =>{
    try {
        const getallHotel = await Hotels.find() 
        res.status(200).send({
            status : 'success',
            Message : 'All hotel is get',
            hotelDB : getallHotel

        })   
    } catch (error) {
        next(error)
    }
}