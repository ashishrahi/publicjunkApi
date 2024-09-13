const {mongoose} = require('mongoose');

const inventorySchema = new mongoose.Schema({
   
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
             },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory',
        },
    status:{
        type:Boolean,
        default:'true',
     },},
    {timestamps:true})


const Inventory = mongoose.model('Inventory', inventorySchema);
 module.exports = Inventory;
