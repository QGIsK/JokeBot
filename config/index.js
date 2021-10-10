const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    MONGODB_URL: Joi.string().default('mongodb://localhost:27017/'),
    CLIENT_ID: Joi.string().description('discord client id'),
    CLIENT_SECRET: Joi.string().description('discord client secret'),
    CLIENT_TOKEN: Joi.string().description('discord client token'),
    CLIENT_INVITE: Joi.string().description('discord bot invitation url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  discord: {
    id: envVars.CLIENT_ID,
    secret: envVars.CLIENT_SECRET,
    token: envVars.CLIENT_TOKEN,
    invite: envVars.CLIENT_INVITE,
  },
};
