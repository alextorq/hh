const appRoot = require('app-root-path');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', false);

mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_PARSE}`, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err);
});

module.exports = mongoose;
