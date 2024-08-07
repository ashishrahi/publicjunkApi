const {mongoose} = require('mongoose');

// ------------ variant schema

const variantSchema = new mongoose.Schema({
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Color',
    },
    dandi:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dandi',
    },
   
    gender:{
       type:mongoose.Schema.Types.ObjectId,
        ref:'Gender',
    },   
    kunda:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kunda',
    },
    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Size',
    },
    weight:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Weight',
    },
    gaugesize:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GaugeSize',
    },  },)

// ------------------ Product Schema

 const productSchema = new mongoose.Schema({
    categoryname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    
    variantdetails:{
        type:variantSchema,
    },
    image:{
        type:String,
    },
    status:{
        type:Boolean,
        default:'true',
    },
},

    {timestamps:true})


const Product = mongoose.model('Product', productSchema);


 module.exports = Product;
