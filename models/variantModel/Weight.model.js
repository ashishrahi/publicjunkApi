const {mongoose} = require('mongoose');

 const weightSchema = new mongoose.Schema({
  
   weight:{
    type:Number,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})

const Weight = mongoose.model('Weight', weightSchema);
 module.exports = Weight;
