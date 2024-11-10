const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
    house: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true, // Set to boolean true instead of string
    },
}, { timestamps: true });

// Define the FinanceDepart schema
const financeDepartSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Optional: Ensure unique email
        match: /.+\@.+\..+/ // Basic email validation
    },
    mobile: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    address: addressSchema, // Use address schema here
    status: {
        type: Boolean,
        default: true, // Set to boolean true instead of string
    },
}, { timestamps: true });

const FinanceDepart = mongoose.model('FinanceDepart', financeDepartSchema);
module.exports = FinanceDepart;
