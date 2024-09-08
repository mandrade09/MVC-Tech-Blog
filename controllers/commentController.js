const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Import the Comment model

router.post('/api/comments', async (req, res) => {
    try {
        const { comment_text, user_id, post_id } = req.body;

        // Convert to integers
        const user_id_int = parseInt(user_id, 10);
        const post_id_int = parseInt(post_id, 10);

        // Validate input
        if (!comment_text || isNaN(user_id_int) || isNaN(post_id_int)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Create comment
        const newComment = await Comment.create({
            comment_text,
            user_id: user_id_int,
            post_id: post_id_int
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


