const { mongoose } = require('mongoose');

//--------------------- addressSchema

const addressSchema = new mongoose.Schema({
    house: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Pincode',
    },
    city: {
        type: String,
        required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'City',
    },
    state: {  
        type: String,
        required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'State',
    },
    country: {
        type: String,
        required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Country',
    },
    status: {
        type: Boolean,
        default: true, // Correcting 'true' to Boolean true
    }
}, { timestamps: true }); // Correct placement of timestamps

// ------------ Driver Schema

const driverSchema = new mongoose.Schema({
    
    // Personal Details
    avatar: {
        type: String,
        default: 'avatar.png',
    },
    name: {
        type: String,
        // uppercase: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: [addressSchema],
    },
    
    // Accounts Details
    aadhaarno: {
        type: String,
        required: true,
    },
     aadhaarimage: {
         type: String,
         required: true,
     },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Warehouse',
    },
    financedepart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FinanceDepart', // Capitalized the model name to follow convention
    },
      
    // Bank Details
    bankname: {
        type: String,
    },
    accountholdername: {
        type: String,
    },
    bankaccountnumber: {
        type: String,
    },
    ifsccode: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true, // Corrected to Boolean true
    }
}, { timestamps: true }); // Correct placement of timestamps

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
