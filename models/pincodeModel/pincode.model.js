const {mongoose} = require('mongoose');

 const pincodeSchema = new mongoose.Schema({
  
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
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'city',
        required:true,
    },
    pincode:{
        type:String
    },
    status:{
      type:Boolean,
      default:true,
    },
    
     },
    {timestamps:true})


const Pincode = mongoose.model('Pincode', pincodeSchema);
 module.exports = Pincode;
