const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET / homepage
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

