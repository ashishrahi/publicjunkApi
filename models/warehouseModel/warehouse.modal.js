const {mongoose} = require('mongoose');

//--------------------- addressSchema

// const addressSchema = new mongoose.Schema({
//     house:{
//         type:String,
//         required: true,
//           },
//     pincode:{
//         type:String,
//         required: true,
//          },
//     city:{
//         type:String,
//         required: true,
//        },
//     country:{
//         type:String,
//         required: true,
//          },
//     status:{
//         type:Boolean,
//         default:'true',
//           },},
//     {timestamps:true})

// ------------ Warehouse Schema

 const warehouseSchema = new mongoose.Schema({
   
    name:{
        type:String,
    },
    email:{
        type:String,
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
        default:'true',
     },},
    {timestamps:true})


const Warehouse = mongoose.model('Warehouse', warehouseSchema);
 module.exports = Warehouse;
