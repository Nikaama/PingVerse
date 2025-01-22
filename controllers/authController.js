const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel'); // Replace with the path to your MySQL user model
const sendOTP = require('../utils/mail');
const generateOTP = require('../utils/generateOTP');  // Implement your OTP generation logic here

// Utility to compare passwords
async function comparePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}

// Render login page
exports.getLoginPage = (req, res) => {
    res.render('login', { message: null });
};

// Handle login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).render('login', { message: 'Invalid email format' });
        }

        // Fetch user from database
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).render('login', { message: 'Invalid email or password' });
        }

        // Validate password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).render('login', { message: 'Invalid email or password' });
        }

        // Save user details in session
        req.session.user = {
            id: user.user_id,
            username: user.username,
            email: user.email,
        };

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login Error:', error.message, error.stack);
        res.status(500).render('login', { message: 'An error occurred. Please try again.' });
    }
};

// Render signup page
exports.getSignupPage = (req, res) => {
    res.render('signup', { otpSent: false, message: null });
};

// Handle signup
exports.signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Log inputs for debugging
        console.log("Signup attempt - Username:", username, "Email:", email, "Password Length:", password.length);

        if (!validator.isEmail(email)) {
            return res.status(400).render('signup', { message: 'Invalid email format', otpSent: false });
        }

        if (password.length < 6) {
            return res.status(400).render('signup', { message: 'Password must be at least 6 characters long', otpSent: false });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).render('signup', { message: 'Email already registered', otpSent: false });
        }

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ where: { username } });
        if (existingUserByUsername) {
            return res.status(409).render('signup', { message: 'Username already taken', otpSent: false });
        }

        // Generate OTP and send via email
        const otp = generateOTP();
        await sendOTP(email, otp);

        // Log OTP for debugging (note: remove in production)
        console.log("OTP Sent:", otp);

        // Store OTP and email in session for later verification
        req.session.otp = otp;
        req.session.email = email;
        req.session.username = username;  // Save username too
        req.session.password = password;  // Save password
        req.session.otpSentAt = Date.now();

        // Render OTP input page with otpSent set to true
        res.render('signup', { otpSent: true, email, username, password });
    } catch (error) {
        console.error('Signup Error:', error.message, error.stack);
        res.status(500).render('signup', { message: 'An error occurred. Please try again.', otpSent: false });
    }
};

// Handle OTP Verification
exports.verifyOTP = async (req, res) => {
    try {
        const { otpEntered, email, username, password } = req.body;

        // Check if OTP matches
        if (req.session.otp === otpEntered && req.session.email === email) {
            // OTP is valid, proceed with creating user
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            await User.create({
                username,
                email,
                password: hashedPassword,
            });

            // Clear OTP from session
            delete req.session.otp;
            delete req.session.email;
            delete req.session.username;
            delete req.session.password;
            delete req.session.otpSentAt;

            res.redirect('/login');
        } else {
            // Invalid OTP
            res.status(400).render('signup', { message: 'Invalid OTP entered.', otpSent: true, email });
        }
    } catch (error) {
        console.error('OTP Verification Error:', error.message, error.stack);
        res.status(500).render('signup', { message: 'An error occurred during OTP verification.' });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err.message, err.stack);
            return res.status(500).render('error', { message: 'Failed to logout. Please try again.' });
        }
        res.clearCookie('user_sid');
        res.redirect('/login');
    });
};