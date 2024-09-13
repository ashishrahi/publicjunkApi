const mongoose = require('mongoose')

const contactusSchema = new mongoose.Schema({
    
name:{
   type:String,
         },
email:{
    type:String,
    },
mobile:{
    type:String,
    },
message:{
    type:String,
        },
         pickupAt:{
 pickupAt:{
  type: Date,
  default: Date.now,
 }

})

const ContactUs = mongoose.model('ContactUs', contactusSchema);


 module.exports = ContactUs;