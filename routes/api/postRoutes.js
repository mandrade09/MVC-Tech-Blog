const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.redirect("/dashboard");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!affectedRows) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json({ message: 'Post updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const affectedRows = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!affectedRows) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

