const {mongoose} = require('mongoose');

 const karigarOrderSchema = new mongoose.Schema({
  
    karigar:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'karigar',
        required:true,
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required:true,
    },    
},{timestamps:true})


const karigarOrder = mongoose.model('karigarOrder', karigarOrderSchema);
 module.exports = karigarOrder;
