const {mongoose} = require('mongoose');

 const stateSchema = new mongoose.Schema({

  user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
  paymentwallet:{
        type:String,
    },
upi:{
        type:String,
    },
    bankaccount:
                 [{accountnumber:{
    type:String,
  },bankname:{
    type:String,
  },IFSC:{
    type:String,
  }
}]
    ,
    status:{
      type:Boolean,
      default: true,
    },
    
     },
    {timestamps:true})


const State = mongoose.model('State', stateSchema);
 module.exports = State;
