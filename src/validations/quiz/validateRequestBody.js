const { body } = require('express-validator');

const quizValidationRules = () => {
  return [
    body('question')
    .trim().not().isEmpty().withMessage('question is required'),
    body('answer')
    .trim().not().isEmpty().withMessage('answer is required'),
  ];
};

module.exports = {
  quizValidationRules,
};