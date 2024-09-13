const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
        required: true
        },
        warehouse:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'warehouse',
            required: true
        }
})

const Booking = mongoose.model('Booking', bookingSchema);
 module.exports = Booking;