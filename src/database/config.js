/* eslint-disable no-console */
const mongoose = require('mongoose');

module.exports = (async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to database');
  } catch (err) {
    console.log(err);
  }
})();
