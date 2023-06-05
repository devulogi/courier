/** REDIS */
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  legacyMode: true,
});

redisClient.connect();

redisClient.on('error', err => {
  console.log('Redis error: ', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('ready', () => {
  console.log('Redis client ready');
});

exports.redisClient = redisClient;
