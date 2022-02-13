const Quiz = require('../../database/models/quiz');
const Statistics = require('../../database/models/statistics');
const User = require('../../database/models/user');
const {
  sendFailureResponse,
  sendSuccessResponse,
} = require('../../utils/response');

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return success message and answered quiz
 */
const answerQuiz = async (req, res) => {
  const { answer } = req.body;
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    if (quiz.answer !== answer) {
      await Statistics.updateOne(
        { quiz: id },
        {
          quiz: id,
          attemptedBy: req.user.id,
          askedBy: quiz.askedBy,
          isCompleted: false,
          $inc: { failedAttempts: 1 },
        },
        { upsert: true }
      );
      sendFailureResponse(res, 400, 'Your answer is wrong, please try again');
      return;
    }
    await Statistics.updateOne(
      { quiz: id },
      {
        quiz: id,
        attemptedBy: req.user.id,
        askedBy: quiz.askedBy,
        isCompleted: true,
      },
      { upsert: true }
    );
    await User.findOneAndUpdate({ id: req.user.id }, {
      $inc: { points: 1 }
    });
    sendSuccessResponse(res, 200, 'Correct answer, well done!', {
      quiz,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = answerQuiz;
