const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure this path is correct

// Signup route
router.get('/signup', authController.getSignupPage); // Ensure getSignupPage is defined
router.post('/signup', authController.signupUser);   // Ensure signupUser is defined

// Login route
router.get('/login', authController.getLoginPage);   // Ensure getLoginPage is defined
router.post('/login', authController.loginUser);     // Ensure loginUser is defined
// POST route to handle OTP verification
router.post('/verify-otp', authController.verifyOTP);


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.redirect('/dashboard'); // Redirect to dashboard if session destruction fails
        }
        res.clearCookie('user_sid'); // Clear the session cookie
        res.redirect('/login'); // Redirect to login page
    });
});

module.exports = router;