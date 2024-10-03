const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderno:{
        type: String,
            },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,

          },
    
    category: {
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Category',
     default: null,

    },

subcategory: {
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Subcategory',
     default: null,

    },
           

    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
         default: null,
              },
warehouse:{
     type:mongoose.Schema.Types.ObjectId,
                ref: 'Warehouse',
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
    statusdriver:{
        type: String,
        enum: ['New','Pending','Working','Rejected','Cancelled','Picked','Delivered'],
    
        default: 'New'
    }
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
