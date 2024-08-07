const {mongoose} = require('mongoose');

 const dandiSchema = new mongoose.Schema({
  
   dandi:{
    type:String,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})


const Dandi = mongoose.model('Dandi', dandiSchema);
 module.exports = Dandi;
