import express from 'express';
import {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
  sendOTP,
  verifyOTP,
} from '../controllers/userController.js';

import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

// 🔐 Auth routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);

// 🔢 OTP routes
userRouter.post('/send-otp', sendOTP);
userRouter.post('/verify-otp', verifyOTP);

// 💸 Payment routes
userRouter.post('/pay-razor', userAuth, paymentRazorpay);
userRouter.post('/verify-razor', verifyRazorpay);

export default userRouter;
