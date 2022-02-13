const express = require('express');
const signin = require('../controllers/auth/signin');
const signup = require('../controllers/auth/signup');
const validateBody = require('../middlewares/common/validateBody');
const validAuthOperation = require('../validations/auth/validateAuthOperation');
const {
  signupValidationRules,
} = require('../validations/auth/validateRequestBody');

const authRouter = express.Router();

authRouter.post('/signin', validAuthOperation, signin);
authRouter.post('/signup', signupValidationRules(), validateBody, validAuthOperation, signup);

module.exports = authRouter;
