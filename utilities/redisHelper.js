const Redis = require("ioredis");
const redisClient = require('../config/redis.config')

// Connection event
redisClient.on("connect", () => {
    console.log('Redis Connected');
});

// Error event
redisClient.on("error", (error) => {
    console.error('Redis Connection Error:', error);
});

// Redis operations
const redisOperations = {
    // Get data from Redis by key
    getData: async (key) => {
        try {
            const cachedData = await redisClient.get(key);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            return null; // Return null if no data is found
        } catch (error) {
            console.error('Error fetching data from Redis:', error);
            throw error; // Rethrow error for handling in caller
        }
    },

    // Set data to Redis with cache duration (in seconds)
    setData: async (key, data, cacheDuration) => {
        try {
            await redisClient.set(key, JSON.stringify(data), 'EX', cacheDuration);
            return 'Data stored in Redis'; // Success message
        } catch (error) {
            console.error('Error setting data in Redis:', error);
            throw error; // Rethrow error for handling in caller
        }
    },

    // Invalidate or delete a key from Redis
    invalidateKey: async (key) => {
        try {
            await redisClient.del(key);
            return `Key ${key} invalidated`; // Success message
        } catch (error) {
            console.error('Error invalidating key in Redis:', error);
            throw error; // Rethrow error for handling in caller
        }
    }
};

// Exporting redisClient and operations
module.exports = {
    redisClient,
    redisOperations
};
