const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel'); // Replace with the path to your MySQL user model

// Utility to compare passwords
const comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

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
    res.render('signup', { message: null });
};

// Handle signup
exports.signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).render('signup', { message: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).render('signup', { message: 'Password must be at least 6 characters long' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).render('signup', { message: 'Email already registered' });
        }

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ where: { username } });

        if (existingUserByUsername) {
            return res.status(409).render('signup', { message: 'Username already taken' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Signup Error:', error.message, error.stack);
        res.status(500).render('signup', { message: 'An error occurred. Please try again.' });
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