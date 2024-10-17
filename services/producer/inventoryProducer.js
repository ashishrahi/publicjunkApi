const kafka = require('../../config/kafka.config');

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('Inventory Producer connected');
}

async function updateInventory(inventoryUpdate) {
  try {
    await producer.send({
      topic: 'inventory',
      messages: [{ value: JSON.stringify(inventoryUpdate) }],
    });
    console.log(`Inventory updated: ${JSON.stringify(inventoryUpdate)}`);
  } catch (error) {
    console.error(`Error updating inventory: ${error.message}`);
  }
}

module.exports = { connectProducer, updateInventory };
