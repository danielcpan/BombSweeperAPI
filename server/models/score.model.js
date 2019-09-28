const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,    
  },
  value: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Score', ScoreSchema);
