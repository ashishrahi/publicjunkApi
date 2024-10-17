// src/producers/kafkaProducer.js
const kafka = require('../config/kafka.config');

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('Kafka Producer connected');
}

async function sendMessage(topic, message) {
  try {
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    console.log(`Message sent: ${message}`);
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
  }
}

module.exports = { connectProducer, sendMessage };
