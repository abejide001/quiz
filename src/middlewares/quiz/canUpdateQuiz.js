const Quiz = require("../../database/models/quiz");
const { sendFailureResponse } = require("../../utils/response");


const canUpdateQuiz = async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  const currentUser = req.user.id;
  if (quiz.askedBy.toString() !== currentUser) {
      sendFailureResponse(res, 400, "You can't update this quiz");
      return;
  }
  next();
};

module.exports = canUpdateQuiz;
