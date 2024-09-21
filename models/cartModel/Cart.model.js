const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Cart Schema
const cartSchema = new Schema(
  
{
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
