const mongoose = require('mongoose');
const Redis = require('ioredis');
const amqp = require('../config/rabbit.config');

module.exports.checkHealthStatus = async (req, res) => {
    const healthStatus = {
        mongodb: 'UNKNOWN',
        redis: 'UNKNOWN',
        rabbitMq: 'UNKNOWN',
    };

    let overallHealthStatus = 200;

    // Health status of MongoDB connection
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        healthStatus.mongodb = 'OK';
    } catch (error) {
        healthStatus.mongodb = 'DOWN';
        overallHealthStatus = 503;
    }

    // Health status of Redis connection
    try {
        const redisClient = new Redis({
            host: 'localhost', // Use local Redis instance for testing purposes
            port: 6379,
        });
        const pingResult = await redisClient.ping();
        if (pingResult === 'PONG') {
            healthStatus.redis = 'OK';
        } else {
            healthStatus.redis = 'DOWN';
            overallHealthStatus = 503;
        }
    } catch (error) {
        healthStatus.redis = 'DOWN';
        overallHealthStatus = 503;
    }

    // Health status of RabbitMQ connection
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        healthStatus.rabbitMq = 'OK';
        await connection.close();
    } catch (error) {
        healthStatus.rabbitMq = 'DOWN';
        overallHealthStatus = 503;
    }

    res.status(overallHealthStatus).json(healthStatus);
};
