const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel'); // Import the Message model

// Chat route to display messages
router.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50).lean();
        const formattedMessages = messages.reverse().map(msg => ({
            username: msg.username,
            message: msg.message,
            timestamp: msg.timestamp // Send the full timestamp
        }));

        res.render('chat', { 
            title: 'Chat Room',
            user: req.session.user.username,
            messages: formattedMessages
        });
    } catch (err) {
        console.error('Error loading messages:', err);
        res.status(500).send('Error loading chat messages');
    }
});
module.exports = router;