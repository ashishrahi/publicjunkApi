const mongoose = require('mongoose');

// ---------------- Payment Type Schema
const paymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 
})

// Payment Schema
const paymentSchema = new mongoose.Schema({
 user:{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
  },
 
  order:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Order'
  },
  paymenttype: {
    type: paymentTypeSchema,
    required: true
  },
  provider:{
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
