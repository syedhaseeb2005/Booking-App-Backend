import Users from "../models/usersmodel.js"

// update a user
export const updateUser = async (req,res,next) =>{
    try {
        const updateUser = await Users.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new : true}
            ) 
        res.status(200).send({
            status : 'success',
            Message : 'User is updated',
            UserDB : updateUser
        })   
    } catch (error) {
        next(error)
    }
}

// delete a user
export const deleteUser = async (req,res,next) =>{
    try {
        await Users.findByIdAndDelete(req.params.id) 
       res.status(200).send({
           status : 'success',
           Message : 'User is deleted',

       })   
    } catch (error) {
       next(error)
   }
}

// get a User
export const getUser = async (req,res,next) =>{
    try {
        const getUser = await Users.findById(req.params.id) 
        res.status(200).send({
            status : 'success',
            Message : 'User is get',
            UserDB: getUser

        })   
    } catch (error) {
        next(error)
    }
}

// get all Users
export const getAllUsers = async (req,res,next) =>{
    try {
        const getAllUsers = await Users.find() 
        res.status(200).send({
            status : 'success',
            Message : 'All hotel is get',
            UserDB : getAllUsers
        })   
    } catch (error) {
        next(error)
    }
}