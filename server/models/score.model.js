const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    trim: true,
    required: [true, 'Player Name is required'],
    maxlength: [16, 'Player Name cannot be longer than 16 characters']

  },
  difficulty: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Score', ScoreSchema);
