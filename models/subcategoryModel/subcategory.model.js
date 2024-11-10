const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
    
category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    },
    priceWithUnit:{
        type: String,
        required: true,
        min: 0,
 
    },
        
subcategoryname:{
        type:String,
             },
image:{
        type:String,
      },
status:{
        type: Boolean,
        default: true,
      },
subcategorydescription:{
          type: String,

 },
 createdAt:{
  type: Date,
  default: Date.now,
 }})

const Subcategory = mongoose.model('Subcategory', subcategorySchema);


 module.exports = Subcategory;