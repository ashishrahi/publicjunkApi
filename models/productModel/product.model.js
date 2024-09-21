const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
         },
productname:{
        type: String,
        },
image:{
        type:[String],
      },
status:{
        type: Boolean,
        default: true,
      },
productdescription:{
          type: String,

 },
price:{
    type: Number,
    default: 0,
 },
 quantity:{
  type: Number,
  default: 0,
 },
 size: {
  type: String,
  enum: ['L', 'XL', 'XS'],
  default: 'No Size',
},
 rating:{
  type: Number,
  default: 0,
 },
 createdAt:{
  type: Date,
  default: Date.now,
 }

})

const Product = mongoose.model('Product', productSchema);


 module.exports = Product;