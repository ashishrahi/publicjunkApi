const kafka = require('../../config/kafka.config');

const consumer = kafka.consumer({ groupId: 'inventory-management' });

async function connectConsumer() {
  await consumer.connect();
  console.log('Inventory Consumer connected');
  
  await consumer.subscribe({ topic: 'inventory', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const inventoryUpdate = JSON.parse(message.value.toString());
      console.log(`Updating inventory: ${JSON.stringify(inventoryUpdate)}`);
      // Implement inventory update logic here
    },
  });
}

module.exports = { connectConsumer };
