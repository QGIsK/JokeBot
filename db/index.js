const config = require('../config');
const logger = require('../config/logger');

const mongoose = require('mongoose');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => logger.info('Ready! MongoDB Connected'));

module.exports = {
  Server: require('./models/Server'),
};
