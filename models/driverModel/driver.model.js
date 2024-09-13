const {mongoose} = require('mongoose');

//--------------------- addressSchema

const addressSchema = new mongoose.Schema({
    house:{
        type:String,
        required: true,
          },
    pincode:{
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
         },
    status:{
        type:Boolean,
        default:'true',
          },},
    {timestamps:true})

// ------------ Driver Schema

 const driverSchema = new mongoose.Schema({
    avatar:{
        type:String,
        default:'avatar.png'
    },
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
    aadhar:{
        type:String,
        required: true,
    },
    aadharimage:{
        type:String,
        required: true,
    },
    warehouse:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'warehouse',
    },
    finance:{
         type:mongoose.Schema.Types.ObjectId,
         ref: 'finance',
    },
    address:{
        type:[addressSchema],
    },  
    status:{
        type:Boolean,
        default:'true',
     },},
    {timestamps:true})


const Driver = mongoose.model('Driver', driverSchema);
 module.exports = Driver;
