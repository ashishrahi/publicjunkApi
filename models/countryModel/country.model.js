const {mongoose} = require('mongoose');

 const countrySchema = new mongoose.Schema({
  
  countryname:{
        type:String,
             },
             
    status:{
      type:Boolean,
      default: true,
    },
    
     },
    {timestamps:true})


const Country = mongoose.model('Country', countrySchema);
 module.exports = Country;
