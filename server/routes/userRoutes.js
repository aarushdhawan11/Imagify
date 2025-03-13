import express from 'express'
import {registerUser, loginUser, userCredits, paymentRazorpay} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/credits', userAuth ,userCredits)
userRouter.post('/pay-razor', userAuth , paymentRazorpay)

export default userRouter

//  http://localhost:4000/api/user/register -> it will call registerUser route
//  http://localhost:4000/api/user/login -> it will call login route

