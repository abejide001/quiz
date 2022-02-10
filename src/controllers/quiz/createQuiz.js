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
 * @return {Object} Return success message and created quiz
 */
const createQuiz = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const quiz = await Quiz.create({
        question,
        answer,
        askedBy: req.user.id
    });
    sendSuccessResponse(res, 201, 'Quiz created successfully', {
      quiz
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = createQuiz;
