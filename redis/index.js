const Redis = require('ioredis');
const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({});
env = dotenvParseVariables(env.parsed);


const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

module.exports = redisClient;
