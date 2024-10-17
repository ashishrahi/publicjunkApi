const kafka = require('../../config/kafka.config');

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('Order Producer connected');
}

async function sendOrder(order) {
  try {
    await producer.send({
      topic: 'orders',
      messages: [{ value: JSON.stringify(order) }],
    });
    console.log(`Order sent: ${JSON.stringify(order)}`);
  } catch (error) {
    console.error(`Error sending order: ${error.message}`);
  }
}

module.exports = { connectProducer, sendOrder };
