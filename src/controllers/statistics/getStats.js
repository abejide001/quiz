const Statistics = require('../../database/models/statistics');
const {
  sendFailureResponse,
  sendSuccessResponse,
} = require('../../utils/response');
/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @return {Object} Returns all stats
 */

const getStats = async (req, res) => {
  try {
    const { success } = req.query;
    let query = {
      attemptedBy: req.user.id,
      ...(success && { success })
    };
    const stats = await Statistics.find(query).populate(
      'quiz',
      'question answer'
    );
    sendSuccessResponse(res, 200, 'Stats fetched successfully', {
      stats,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = getStats;
