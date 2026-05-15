import express from "express"
import {registerUser,loginUser} from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',authMiddleware,(req,res)=>{
    res.json({
        message:"user loggin successfuly",
       user: req.user
    })
})
router.get('/admin',authMiddleware,adminMiddleware,(req,res)=>{
   
    res.json({
        message:"admin access granted"
    })
})

export default router