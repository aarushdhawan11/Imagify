import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Start Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google authentication
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    session: false, // no session, use JWT
  }),
  (req, res) => {
    // Generate a real JWT using the authenticated user
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Redirect to frontend with JWT
    res.redirect(`http://localhost:5173/google-auth-success?token=${token}`);
  }
);

export default router;
