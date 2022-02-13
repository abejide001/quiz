const { check } = require('express-validator');

const createQuizValidationRules = () => {
  return [
    check('question')
    .trim().not().isEmpty().withMessage('question is required'),
    check('answer')
    .trim().not().isEmpty().withMessage('answer is required'),
  ];
};

const updateQuizValidationRules = () => {
  return [
    check('question')
    .trim().optional({ nullable: false }),
    check('answer')
    .trim().optional({ nullable: false }),
  ];
};

const answerQuizValidation = () => {
  return [
    check('answer')
    .trim().not().isEmpty().withMessage('answer is required'),
  ];
};

module.exports = {
  createQuizValidationRules,
  updateQuizValidationRules,
  answerQuizValidation
};