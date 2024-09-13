const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
    
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
         },
subcategoryname:{
        type: String,
    },
image:{
        type:String,
      },
status:{
        type: Boolean,
        default: true,
      },
categorydescription:{
          type: String,

 },
 unitprice:{
    type: Number,
    default: 0,
 },
 createdAt:{
  type: Date,
  default: Date.now,
 }

})

const SubCategory = mongoose.model('SubCategory', subcategorySchema);


 module.exports = SubCategory;