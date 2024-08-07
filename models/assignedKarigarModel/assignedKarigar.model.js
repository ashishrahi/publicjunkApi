const {mongoose} = require('mongoose');

 const assignedKarigarSchema = new mongoose.Schema({
  
    orders:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
           },
    karigar:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'karigar',
            },},
    {timestamps:true})


const ASSIGNED = mongoose.model('ASSIGNED', assignedKarigarSchema);
 module.exports = ASSIGNED;
