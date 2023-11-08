import  usersmodel  from '../models/usersmodel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// create user
export const signup = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password , salt)
        
        const newUser = new usersmodel({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        await newUser.save()
        res.status(200).send({
            status : 'success',
            Message : 'User is created',
            UserDB : newUser
        })
    } catch (error) {
        next(error)
    }
}


// login user
export const login = async (req,res,next) =>{
    try {
        const user = await usersmodel.findOne(
            {
                username: req.body.username
            })
        if(!user){
            res.status(404).send('User not found');
            return;
        }
        const validPassword = await bcrypt.compare(req.body.password , user.password);
        if(!validPassword){
            res.status(400).send('Incorrect password')
            return
        }

        const token = jwt.sign(
            {
                id : user._id   , 
                isAdmin : user.isAdmin
            },process.env.Jwt
            )

        const {password , isAdmin , ...other} = user._doc
        res.cookie(
            "access_token", 
            token,
            {httpOnly : true}
        ).status(200).send({
            status: 'success',
            message: 'User login successfully',
            UserLoggedIn: {...other}
        });

    } catch (error) {
        next(error)
    }
}