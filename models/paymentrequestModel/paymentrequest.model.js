const {mongoose} = require('mongoose');

 const paymentrequestSchema = new mongoose.Schema({
  
    name:{
        type: string,
    },
    email:{
        type: string,
    },
    mobile:{
        type:String,
    },
    type:{
        type:String,
    },
    address:{
        type:String,
    },
    status:{
      type:Boolean,
    },
    
     },
    {timestamps:true})


const PaymentRequest = mongoose.model('PaymentRequest', paymentrequestSchema);
 module.exports = PaymentRequest;
