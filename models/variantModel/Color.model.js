const {mongoose} = require('mongoose');

 const colorSchema = new mongoose.Schema({
  
   color:{
    type:String,
   },
   status:{
    type:Boolean,
    default:'true',
   }},
   
    {timestamps:true})





const Color = mongoose.model('Color', colorSchema);
 module.exports = Color;
