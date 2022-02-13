const express = require('express');
const answerQuiz = require('../controllers/quiz/answerQuiz');
const createQuiz = require('../controllers/quiz/createQuiz');
const getAllQuiz = require('../controllers/quiz/getAllQuiz');
const getOneQuiz = require('../controllers/quiz/getOneQuiz');
const updateQuiz = require('../controllers/quiz/updateQuiz');
const requireAuth = require('../middlewares/auth/requireAuth');
const validateBody = require('../middlewares/common/validateBody');
const canAnswerQuiz = require('../middlewares/quiz/canAnswerQuiz');
const canUpdateQuiz = require('../middlewares/quiz/canUpdateQuiz');
const verifyQuiz = require('../middlewares/quiz/verifyQuiz');
const validateQuizOperation = require('../validations/quiz/validateQuizOperation');
const {
  createQuizValidationRules,
} = require('../validations/quiz/validateRequestBody');

const quizRouter = express.Router();

quizRouter.post(
  '/',
  requireAuth,
  createQuizValidationRules(),
  validateBody,
  createQuiz
);

quizRouter.get('/', requireAuth, getAllQuiz);
quizRouter.get('/:id', requireAuth, verifyQuiz, getOneQuiz);
quizRouter.put(
  '/:id',
  requireAuth,
  validateQuizOperation,
  verifyQuiz,
  canUpdateQuiz,
  updateQuiz
);
quizRouter.post('/:id/answer', requireAuth, canAnswerQuiz, answerQuiz);
module.exports = quizRouter;
