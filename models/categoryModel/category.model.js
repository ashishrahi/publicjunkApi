const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
categoryname:{
        type:String,
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
 createdAt:{
  type: Date,
  default: Date.now,
 }

})

const Category = mongoose.model('Category', categorySchema);


 module.exports = Category;