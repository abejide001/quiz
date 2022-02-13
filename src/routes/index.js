const express = require('express');
const authRouter = require('./auth');
const quizRouter = require('./quiz');
const statsRouter = require('./stats');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../misc/docs/swagger.json');

const routes = () => {
  const router = express.Router();
  router.use('/auth', authRouter);
  router.use('/quiz', quizRouter);
  router.use('/stats', statsRouter);
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return router;
};

module.exports = routes;
