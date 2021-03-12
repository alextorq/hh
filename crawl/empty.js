const appRoot = require('app-root-path');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', false);

// eslint-disable-next-line consistent-return
mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_PARSE}`, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err);
  db.dropDatabase(function(err, result){
    console.log("Error : "+err);
    if (err) throw err;
    console.log("Operation Success ? "+result);
    // after all the operations with db, close it.
    db.close();
  });
});

module.exports = mongoose;
