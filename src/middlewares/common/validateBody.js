const { validationResult } = require('express-validator');
const { sendFailureResponse } = require('../../utils/response');

const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push({ [err.param]: err.msg }));
    sendFailureResponse(res, 422, extractedErrors);
    return;
  }
  return next();
};

module.exports = validateBody;
