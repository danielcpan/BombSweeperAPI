const httpStatus = require('http-status');
const Score = require('../models/score.model');

module.exports = {
  list: async (req, res, next) => {    
    try {
      const leaderboard = await Score.find(req.query)
        .sort({ value: 1, seconds: 1 })
        .limit(100);

      return res.json(leaderboard);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const score = new Score(req.body);
      await score.save();

      return res.status(httpStatus.CREATED).json(score);
    } catch (err) {
      return next(err);
    }
  },
};
