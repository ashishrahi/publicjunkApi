const redis = require('redis');
const { RedisClient } = redis;      

const client = RedisClient.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

module.exports = client;
