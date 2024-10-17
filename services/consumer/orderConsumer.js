const kafka = require('../../config/kafka.config');

const consumer = kafka.consumer({ groupId: 'order-processing' });

async function connectConsumer() {
  await consumer.connect();
  console.log('Order Consumer connected');
  
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log(`Processing order: ${JSON.stringify(order)}`);
      // Implement order processing logic here (payment, inventory check, etc.)
    },
  });
}

module.exports = { connectConsumer };
