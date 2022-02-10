const jwt = require('jsonwebtoken');

/**
 * @param {object} user
 *
 * @returns {string} returns a token
 */

const jwtGenerator = (user) => {
  const { email, id } = user;
  const token = jwt.sign({ id, email }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = jwtGenerator;
