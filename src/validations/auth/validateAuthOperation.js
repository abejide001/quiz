const { sendFailureResponse } = require("../../utils/response");


const validAuthOperation = (req, res, next) => {
  const params = Object.keys(req.body); // req.body is coming from API
  const allowedPayload = ["email", "password"];
  const isValidOperation = params.every((param) =>
    allowedPayload.includes(param)
  );

  if (!isValidOperation) {
    sendFailureResponse(res, 400, `Invalid operation, enter email and password`);
    return;
  }
  next();
};

module.exports = validAuthOperation;