const User = require('../../database/models/user');
const {
  sendFailureResponse,
  sendSuccessResponse,
} = require('../../utils/response');
const jwtGenerator = require('../../utils/jwtGenerator');

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return registered user
 */

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendFailureResponse(res, 409, 'User already exist');
      return;
    }
    const user = await User.create({
      email,
      password,
    });
    const token = jwtGenerator(user);
    sendSuccessResponse(res, 201, 'User registered successfully', {
      user,
      token,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = signup;
