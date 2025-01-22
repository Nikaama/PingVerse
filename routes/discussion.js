const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define Discussion Schema
const discussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [
        {
            content: { type: String, required: true },
            author: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

// Create Discussion Model
const Discussion = mongoose.model('Discussion', discussionSchema);

// GET all discussions
router.get('/', async (req, res) => {
    try {
        const discussions = await Discussion.find().sort({ createdAt: -1 });
        res.render('discussion', { user: req.session.user, discussions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// POST a new discussion
router.post('/api/discussions', async (req, res) => {
    const { title, content } = req.body;
    const author = req.session.user; // Assuming the user is stored in session

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const discussion = new Discussion({ title, content, author });
        await discussion.save();
        res.status(201).json({ message: 'Discussion created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating discussion' });
    }
});

// POST a reply to a discussion
router.post('/api/discussions/:id/replies', async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
    const author = req.session.user; // Assuming the user is stored in session

    if (!content) {
        return res.status(400).json({ message: 'Reply content is required' });
    }

    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        discussion.replies.push({ content, author });
        await discussion.save();
        res.status(201).json({ message: 'Reply added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding reply' });
    }
});

module.exports = router;