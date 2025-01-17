const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Import the User model
const LoggedinUserUploads = require('../models/loggedinuser_uploads'); // Import the new model

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// Fetch user details from the database using Sequelize
const getUserDetails = async (userId) => {
  try {
    const user = await User.findOne({
      where: { user_id: userId },
      attributes: ['user_id', 'username', 'email', 'bio'],
    });

    if (!user) {
      console.log(`No user found with ID: ${userId}`);
      return null;
    }

    return {
      id: user.user_id,
      username: user.username,
      email: user.email,
      bio: user.bio,
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Error fetching user details');
  }
};

// Fetch posts of the logged-in user from the media_uploads table
const getUserPosts = async (username) => {
  try {
    const posts = await LoggedinUserUploads.findAll({
      where: { username: username },
      order: [['uploaded_at', 'DESC']],
    });
    return posts;
  } catch (error) {
    throw new Error('Error fetching user posts');
  }
};

// Profile route
// Profile route
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id; // Get the logged-in user ID from the session

    // Fetch user details and posts dynamically using Sequelize
    const userDetails = await getUserDetails(userId);
    const posts = await getUserPosts(req.session.user.username); // Get the posts for the logged-in user

    if (!userDetails) {
      // If no user is found, show an error page
      return res.status(404).render('error', { message: 'User not found' });
    }

    // Render the profile page with the user details and posts
    res.render('profile', {
      user: userDetails,
      posts: posts, // Pass the posts directly from the DB query
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    // Render the error page if something goes wrong
    res.status(500).render('error', { message: 'Internal server error' });
  }
});

module.exports = router;