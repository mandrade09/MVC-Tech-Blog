const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/comments
router.post('/', withAuth, async (req, res) => {
    const { comment_text, post_id } = req.body;
    const user_id = req.session.user_id; // Use session user_id

    if (!comment_text || !user_id || !post_id) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const newComment = await Comment.create({
            comment_text,
            user_id,
            post_id,
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;




