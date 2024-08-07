const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    title: String,
    image: String,
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Banner', bannerSchema)