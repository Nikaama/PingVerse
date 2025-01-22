const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render the Signup page
router.get('/', authController.getSignupPage);

// Handle the Signup logic
router.post('/', authController.signupUser);

// Handle OTP verification
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;