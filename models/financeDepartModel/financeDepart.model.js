const {mongoose} = require('mongoose');

//////////////////////  addressSchema //////////////////////////////////////////////////////

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

/////////////////////  FinanceDepart Schema //////////////////////////////////////////// 

 const financedepartSchema = new mongoose.Schema({
    name:{
        type:String,
        uppercase:true,
    },
    email:{
        type:String,
        required: true,
    },
    mobile:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
  
    address:{
        type:String,
    },  
    status:{
        type:Boolean,
        default:'true',
     },},
    {timestamps:true})


const FinanceDepart = mongoose.model('FinanceDepart', financedepartSchema);
 module.exports = FinanceDepart;
