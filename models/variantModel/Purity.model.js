const {mongoose} = require('mongoose');

 const puritySchema = new mongoose.Schema({
  
   purity:{
    type:String,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})





const Purity = mongoose.model('Purity', puritySchema);
 module.exports = Purity;
