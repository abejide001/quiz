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
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Returns all quiz
 */

const getOneQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id).select('-answer');
    sendSuccessResponse(res, 200, "Quiz fetched successfully", quiz);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = getOneQuiz;
