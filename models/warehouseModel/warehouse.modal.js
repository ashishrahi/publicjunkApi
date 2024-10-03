const {mongoose} = require('mongoose');

//--------------------- addressSchema

const addressSchema = new mongoose.Schema({
    house:{
        type:String,
        required: true,
          },
    pincode:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Pincode',
        type:String,
         },
    city:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'City',
        type: String,
       
       },
    country:{               
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Country',
        type: String,
 
         },
    status:{
        type:Boolean,
        default:'true',
          },},
    {timestamps:true})

// ------------ Warehouse Schema

 const warehouseSchema = new mongoose.Schema({
   
// Personel Details

    name:{
        type:String,
    },
    image:{
        type: String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    password:{
        type:String,
    },
    type:{
        type:String,
        enum:['Main','Sub']
    },
    address:{
        type:[addressSchema],
    },  
    status:{
        type:Boolean,
        default:'true',
     },},
    {timestamps:true})


const Warehouse = mongoose.model('Warehouse', warehouseSchema);
 module.exports = Warehouse;
