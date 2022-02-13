const { body } = require('express-validator');

const signupValidationRules = () => {
  return [
    body('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password is required')
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ];
};


module.exports = {
  signupValidationRules,
};
