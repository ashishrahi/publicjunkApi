// src/config/kafkaConfig.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
});

module.exports = kafka;
