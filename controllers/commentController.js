const express = require('express');
const router = express.Router();

const apiRoutes = require('../api/homeRoutes');
const homeRoutes = require('./userController');
const dashboardRoutes = require('./postController');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;

