// utils/cache.js
const redisClient = require('../config/redis.config');

const cache = (duration) => {
  return (req, res, next) => {
    const { id } = req.params;

    redisClient.get(id, (err, data) => {
      if (err) {
        console.error('Redis error:', err);
        return next();
      }
      
      if (data) {
        // Data exists in cache
        return res.json(JSON.parse(data));
      } else {
        // Data does not exist in cache, proceed to the next middleware/handler
        res.sendResponse = res.send;
        res.send = (body) => {
          redisClient.setex(id, duration, JSON.stringify(body));
          res.sendResponse(body);
        };
        next();
      }
    });
  };
};

module.exports = cache;
