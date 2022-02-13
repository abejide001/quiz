const express = require('express');
const getQuizStats = require('../controllers/statistics/getQuizStats');
const getUserStats = require('../controllers/statistics/getUserStats');
const requireAuth = require('../middlewares/auth/requireAuth');

const statsRouter = express.Router();

statsRouter.get('/user', requireAuth, getUserStats);
statsRouter.get('/quiz', requireAuth, getQuizStats);

module.exports = statsRouter;
