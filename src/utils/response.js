const sendSuccessResponse = (res, code, message, data) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

const sendFailureResponse = (res, code, data) => {
  return res.status(code).json({
    status: "fail",
    error: data,
  });
};

module.exports =  {
  sendFailureResponse,
  sendSuccessResponse
};