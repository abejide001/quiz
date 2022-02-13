const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
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
      },
    },
    timestamps: true
  }
);


const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
