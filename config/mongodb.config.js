const mongoose = require('mongoose')

//database connection settings
const connectDB = async()=>{

    mongoose.connect(`${process.env.MONGODB_URI}/PublicJunk`);
    mongoose.connection.on('connected',()=>{
     console.log('connection is established')   
    })

}

module.exports = connectDB;