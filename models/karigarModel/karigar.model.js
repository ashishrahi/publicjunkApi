const {mongoose} = require('mongoose');

 const karigarSchema = new mongoose.Schema({
  
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    categoryId:{
        type:String,
        
    },
    name:{
        type:String,
    },
    phone:{
        type:String,
        required: true,
        unique: true,
    },
    house:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },
    country:{
        type:String,
        required: true,
    }
   
   
   
    
},
    {timestamps:true})


const Karigar = mongoose.model('Karigar', karigarSchema);
 module.exports = Karigar;
