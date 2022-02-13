const Quiz = require('../../database/models/quiz');
const {
  sendFailureResponse,
  sendSuccessResponse,
} = require('../../utils/response');
/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @return {Object} Returns all quiz
 */

const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('-answer').sort({ createdAt: -1 });
    sendSuccessResponse(res, 200, "Quizzes fetched successfully", quizzes);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = getAllQuiz;
