const Quiz = require('../../database/models/quiz');
const { sendFailureResponse } = require('../../utils/response');

const verifyQuiz = async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    sendFailureResponse(res, 422, 'Provide a valid id');
    return;
  }
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    sendFailureResponse(res, 404, 'Quiz not found');
    return;
  }
  next();
};

module.exports = verifyQuiz;
