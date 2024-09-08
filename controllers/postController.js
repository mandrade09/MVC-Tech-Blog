const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for the logged-in user
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { 
            posts, 
            logged_in: true 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one post for editing
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                ...post,
                logged_in: true
            });
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

