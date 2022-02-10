const User = require('../../database/models/user');
const {
  sendFailureResponse,
  sendSuccessResponse,
} = require('../../utils/response');
const { comparePassword } = require('../../utils/password');
const jwtGenerator = require('../../utils/jwtGenerator');

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return success message and logged in user
 */
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email});
    if (!user) {
      sendFailureResponse(res, 401, 'Incorrect credentials');
      return;
    }

    const passwordMatch = await comparePassword(user.password, password);

    if (!passwordMatch) {
      sendFailureResponse(res, 401, 'Incorrect credentials');
      return;
    }
    const token = jwtGenerator({
      id: user.id,
      email: user.email,
    });

    sendSuccessResponse(res, 200, 'User logged in successfully', {
      user,
      token,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = signin;
