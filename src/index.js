/* eslint-disable no-console */
const app = require('./app');

require("./database/config");

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

process.on('unhandledRejection', () => {
  server.close(() => {
    process.exit(1); // shut down the app
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});