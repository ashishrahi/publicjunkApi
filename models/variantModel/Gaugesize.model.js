const {mongoose} = require('mongoose');

 const gaugesizeSchema = new mongoose.Schema({
  
    gaugesize:{
    type:Number,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})





const GaugeSize = mongoose.model('GaugeSize', gaugesizeSchema);
 module.exports = GaugeSize;
