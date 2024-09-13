const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
         },
subcategoryname:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'subcategory',
    },
 pickupAt:{
  type: Date,
  default: Date.now,
 }

})

const Collection = mongoose.model('Collection', collectionSchema);


 module.exports = Collection;