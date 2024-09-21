const {mongoose} = require('mongoose');

 const countrySchema = new mongoose.Schema({
  countryname:{
        type:String,
             },
             
    status:{
      type:Boolean,
      default: true,
    },
    creataAt:{
      type: Date,
      default: Date.now,
    }
    
     },
    {timestamps:true})




const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
