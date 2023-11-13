import  express  from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRoute from './Routes/authRoute.js'
import hotelsRoute from './Routes/hotelsRoute.js'
import usersRoute from './Routes/usersRoute.js'
import roomsRoute from './Routes/roomsRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const port = 8000;
dotenv.config()

const mongooseconnect = async () =>{
    try {
        await mongoose.connect(process.env.Mongo_Url)
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
    }
}
mongoose.connection.on('disconnected',()=>{
    console.log('Mongo disconnected!');
})


mongoose.connection.on('connected',()=>{
    console.log('Mongo Connected');
})

// middleware
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/users',usersRoute)
app.use('/api/rooms',roomsRoute)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500; 
    const errorMessage = err.message ||  'Something went wrong!'
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })
})

app.get('/',(req,res)=>{
    res.send('Hello First Request');
})


app.listen(port , ()=>{
    mongooseconnect()
    console.log(`Listening at port ${port}!`);
})

