const express = require('express');
const scoreRoutes = require('./score.route');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/leaderboard', scoreRoutes);

module.exports = router;
