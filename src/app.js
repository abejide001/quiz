const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const routes = require('./routes');
const { sendFailureResponse } = require('./utils/response');
const { urlencoded } = require("express");

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use('/api/v1/', routes());

app.get('/api/v1', (_, res) => {
  res.status(200).json({
    message: `Welcome to v1 of quiz, visit the docs - ${'https://quiz-2022.herokuapp.com/api/v1/docs'}`,
  });
});

app.all('*', (_, res) => {
  sendFailureResponse(res, 404, 'Route not found');
});

module.exports = app;
