const Redis = require("ioredis");

const redisClient = new Redis({
  // host: 'redis-14145.c8.us-east-1-3.ec2.redns.redis-cloud.com',
  // password: 'wRlPazyJAvANGDSeMzc46zC6XfwGbJDo',

  host: 'localhost',  // Use local Redis instance for testing purposes (docker container)
  port: 6379,
});

redisClient.on("connect", () => {
  console.log('Redis Connected');
}); 

module.exports = redisClient;
