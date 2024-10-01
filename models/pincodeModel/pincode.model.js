const {mongoose} = require('mongoose');

 const pincodeSchema = new mongoose.Schema({
  
    country:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Country',
        required:true,
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'State',
        required:true,
    },
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'City',
        required:true,
    },
    pincode:{
        type:Number
    },
    status:{
      type:Boolean,
      default:true,
    },
    
     },
    {timestamps:true})


const Pincode = mongoose.model('Pincode', pincodeSchema);
 module.exports = Pincode;
