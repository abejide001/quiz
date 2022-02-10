const express = require('express');
const getStats = require('../controllers/statistics/getStats');
const requireAuth = require('../middlewares/auth/requireAuth');

const statsRouter = express.Router();

statsRouter.get('/', requireAuth, getStats);

module.exports = statsRouter;
