const mongoose = require('mongoose');

// Subcategory
const subcategorySchema = new mongoose.Schema({
    subcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    priceWithUnit: {
        type: Number,
        required: true,
    }
});



//orderschema


const orderSchema = new mongoose.Schema({
    orderno:{
        type: String,
            },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,

          },
    
subcategory: [subcategorySchema],
           

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
