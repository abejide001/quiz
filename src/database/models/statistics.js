const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    attemptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    failedAttempts: {
      type: Number,
      default: 0
    },
    success: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
