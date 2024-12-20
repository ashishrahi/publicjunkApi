// generateOrderId.js

export function generateOrderId() {
  const prefix = "ORD";
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
  return `${prefix}${randomNumber}`;
}


