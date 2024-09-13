const {mongoose} = require('mongoose');

 const citySchema = new mongoose.Schema({
  
    country:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'country',
        required:true,
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'state',
        required:true,
    },
    cityname:{
        type:String,
    },
    status:{
      type:Boolean,
      default: true,
    },
    
     },
    {timestamps:true})


const City = mongoose.model('City', citySchema);
 module.exports = City;
