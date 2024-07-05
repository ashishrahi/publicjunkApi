const {mongoose} = require('mongoose');

 const kundaSchema = new mongoose.Schema({
  
   kunda:{
    type:String,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})





const Kunda = mongoose.model('Kunda', kundaSchema);
 module.exports = Kunda;
