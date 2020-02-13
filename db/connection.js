const appRoot         = require('app-root-path');
require('dotenv').config();
const mongoose        = require("mongoose");

mongoose.set('debug', true);

mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
});

module.exports = mongoose;
