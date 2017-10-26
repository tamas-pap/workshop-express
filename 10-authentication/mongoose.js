const mongoose = require('mongoose');
const { url, useMongoClient } = require('./config/mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient });

module.exports = mongoose;
