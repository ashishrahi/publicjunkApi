const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderno:{
        type: String,
            },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
          },
    
    category: {
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Category',
              },

    karigar:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Karigar',
         default: null,
              },
   
    orderdate: {
        type: Date,
        default: Date.now
                },
    
    status: {
        type: String,
        enum: ['New','Rejected','Accepted'],
        default: 'New'
            },
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
