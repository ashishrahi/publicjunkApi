const {mongoose} = require('mongoose');

//--------------- Address Schema 

const addressSchema = new mongoose.Schema({
    house:{
        type:String,
    },
    zipcode:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    
})


 const venderSchema = new mongoose.Schema({
    
    name:{
        type:String,
    },
    phone:{
        type:String,
        required: true,
    },
    address:{
        type:addressSchema,
    },
    status:{
        type:Boolean,
        default:'true',
     },},
    {timestamps:true})


const Venders = mongoose.model('Venders', venderSchema);
 module.exports = Venders;
