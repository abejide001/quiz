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
 * @return {Object} Returns updated quiz
 */

const updateQuiz = async (req, res) => {
  const { question, answer } = req.body;
  const { id } = req.params;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {
        question,
        answer,
      },
      {
        new: true,
      }
    );
    sendSuccessResponse(res, 200, 'Question updated', updatedQuiz);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = updateQuiz;
