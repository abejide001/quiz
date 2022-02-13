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
    isCompleted: {
      type: Boolean,
      default: false,
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    timestamps: true
  }
);

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
