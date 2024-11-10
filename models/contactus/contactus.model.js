const mongoose = require('mongoose')

const contactusSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    message:{
        type:String,
    },
    status: {
        type: Boolean,
        default: true, // Set to boolean true instead of string
    },
    
},{ timestamps: true })


const ContactUs = mongoose.model('ContactUs', contactusSchema);
module.exports = ContactUs;