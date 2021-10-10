const mongoose = require('mongoose');

const ServerSchema = mongoose.Schema({
  guildID: {
    type: String,
    required: true,
    trim: true,
  },
  safeMode: {
    type: Boolean,
    default: false,
  },
  lang: {
    type: String,
    default: 'en',
  },
});

ServerSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  const one = await this.findOne(condition);

  return one || this.create(condition);
};

/**
 * @typedef Server
 */
const Server = mongoose.model('Server', ServerSchema);

module.exports = Server;
