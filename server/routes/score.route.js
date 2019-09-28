const express = require('express');
const scoreController = require('../controllers/score.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(scoreController.list)
  .post(scoreController.create);

module.exports = router;
