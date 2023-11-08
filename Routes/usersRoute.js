import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usersControllers.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


// router.get('/checkauthentication' , verifyToken , (req,res,next)=>{
//     res.send("Hello user , you are Logged In")
// })

// router.get('/chechuser/:id' , verifyUser , (req,res,next) =>{
//     res.send("Hello user , you are Logged In & you can delete your account")
// })

// router.get('/checkAdmin/:id' , verifyAdmin , (req,res,next) =>{
//     res.send("Hello Admin , you are Logged In & you can delete all accounts")
// })


// update a user
router.put('/:id' , verifyUser, updateUser)

// delete a user
router.put('/:id' , verifyUser, deleteUser)

// get a user 

router.get('/:id' , verifyUser, getUser)

// get all user 
router.get('/' , verifyAdmin , getAllUsers)


export default router