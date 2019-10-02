const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    trim: true,
    required: [true, 'PlayerName is required']
  },
  difficulty: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  seconds: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Score', ScoreSchema);
