const amqp = require('amqplib');
const { LOG_QUEUE } = require('../config/constant');

let channel = null;

const connectRabbitMQ = async () => {
   
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await conn.createChannel();
        await channel.assertQueue(LOG_QUEUE, { durable: true }); // Make the queue durable
        console.log(`Connected to RabbitMQ and listening on ${LOG_QUEUE}`);

        // Handle connection close
        conn.on('close', () => {
            console.error('RabbitMQ connection closed.');
            process.exit(1);
        });

        // Handle connection error
        conn.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        process.exit(1);
    }
};

module.exports = { connectRabbitMQ, channel };
