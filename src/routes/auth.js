const express = require('express');
const signin = require('../controllers/auth/signin');
const signup = require('../controllers/auth/signup');
const validateBody = require('../middlewares/common/validateBody');
const {
  signupValidationRules, signinValidationRules,
} = require('../validations/auth/validateRequestBody');

const authRouter = express.Router();

authRouter.post('/signin', signinValidationRules(), validateBody, signin);
authRouter.post('/signup', signupValidationRules(), validateBody, signup);

module.exports = authRouter;
