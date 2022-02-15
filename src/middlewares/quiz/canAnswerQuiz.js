const Quiz = require('../../database/models/quiz');
const Statistics = require('../../database/models/statistics');
const { sendFailureResponse } = require('../../utils/response');

const canAnswerQuiz = async (req, res, next) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    const currentUser = req.user.id;
    if (quiz.askedBy.toString() === currentUser) {
      sendFailureResponse(res, 400, "You can't answer the quiz created by you");
      return;
    }
    const stats = await Statistics.findOne({ quiz: id });
    if (
      stats &&
      stats.isCompleted &&
      stats.attemptedBy.toString() === currentUser
    ) {
      sendFailureResponse(
        res,
        400,
        'You have already answered this quiz correctly'
      );
      return;
    }
  } catch (error) {
    sendFailureResponse(res, 500, error);
  }
  next();
};

module.exports = canAnswerQuiz;
