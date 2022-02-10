const jwt = require('jsonwebtoken');

const { sendFailureResponse } = require('../../utils/response');

const requireAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return sendFailureResponse(res, 401, 'Kindly provide a token');

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
  } catch (error) {
    return sendFailureResponse(res, 500, error.message);
  }
  next();
};

module.exports = requireAuth;
