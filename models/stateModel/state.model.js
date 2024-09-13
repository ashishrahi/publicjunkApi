const {mongoose} = require('mongoose');

 const stateSchema = new mongoose.Schema({

  country:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    },
  statename:{
        type:String,
    },
    status:{
      type:Boolean,
      default: true,
    },
    
     },
    {timestamps:true})


const State = mongoose.model('State', stateSchema);
 module.exports = State;
