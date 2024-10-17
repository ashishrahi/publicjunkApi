// src/consumers/kafkaConsumer.js
const kafka = require('../config/kafka.config');

const consumer = kafka.consumer({ groupId: 'my-group' });

async function connectConsumer() {
  await consumer.connect();
  console.log('Kafka Consumer connected');
  
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

module.exports = { connectConsumer };
