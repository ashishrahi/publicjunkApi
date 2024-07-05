const {mongoose} = require('mongoose');

 const genderSchema = new mongoose.Schema({
  
   gender:{
    type:String,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})





const Gender = mongoose.model('Gender', genderSchema);
 module.exports = Gender;
