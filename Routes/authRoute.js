import  express  from "express";
import {signup , login} from '../controllers/authControllers.js'
const router = express.Router();

// signup the user
router.post('/signup' , signup)

// login the user
router.post('/login' , login)


export default router