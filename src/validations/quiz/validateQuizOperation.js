const { sendFailureResponse } = require("../../utils/response");


const validateQuizOperation = (req, res, next) => {
  const params = Object.keys(req.body);
  if (params.length === 0) {
    sendFailureResponse(res, 400, `Kindly provide payload`);
    return;
  }
  const allowedPayload = ["question", "answer"];
  const isValidOperation = params.every((param) =>
    allowedPayload.includes(param)
  );

  if (!isValidOperation) {
    sendFailureResponse(res, 400, `Invalid operation, enter question and answer`);
    return;
  }
  next();
};

module.exports = validateQuizOperation;