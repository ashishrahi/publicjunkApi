const session = require('express-session');
const RedisStore = require('connect-redis').default;  // Import the RedisStore properly

// Set up the Redis store
const redisClient = require('redis').createClient();
redisClient.connect().catch(console.error);  // Make sure the Redis client is properly initialized

module.exports = session({
  store: new RedisStore({ client: redisClient }),  // Use RedisStore with the redis client
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Adjust this depending on your environment (use 'true' in production with HTTPS)
});
