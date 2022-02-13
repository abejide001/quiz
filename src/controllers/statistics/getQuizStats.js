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
 * @return {Object} Returns all quiz stats created by the user
 */

const getQuizStats = async (req, res) => {
  try {
    const { isCompleted } = req.query;
    let query = {
      askedBy: req.user.id,
      ...(isCompleted && { isCompleted })
    };
    const stats = await Statistics.find(query).populate(
      'quiz',
      'question answer'
    );
    
    sendSuccessResponse(res, 200, 'Quiz Stats fetched successfully', {
      stats,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

module.exports = getQuizStats;
