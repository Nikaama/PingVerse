const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel'); // Import the Message model

// Chat route to display messages
router.get('/', async (req, res) => {
    // Redirect to login page if user is not authenticated
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        // Fetch the last 50 messages from the database and sort by timestamp in descending order
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50).lean();

        // Reverse the messages to display them in chronological order
        const formattedMessages = messages.reverse().map(msg => ({
            username: msg.username,
            message: msg.message,
            timestamp: new Date(msg.timestamp).toLocaleTimeString() // Format timestamp
        }));

        // Render the chat page with the user's messages and session info
        res.render('chat', { 
            title: 'Chat Room',
            user: req.session.user.username, // Pass user info
            messages: formattedMessages // Pass formatted messages
        });

    } catch (err) {
        console.error('Error loading messages:', err);
        res.status(500).send('Error loading chat messages');
    }
});

module.exports = router;