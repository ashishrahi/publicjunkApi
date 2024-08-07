const {mongoose} = require('mongoose');

 const sizeSchema = new mongoose.Schema({
  
   size:{
    type:Number,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})





const Size = mongoose.model('Size', sizeSchema);
 module.exports = Size;
