const mongoose = require('mongoose')

//database connection settings
const connectDB = async()=>{

    mongoose.connection.on('connected',()=>{
     console.log('connection is established')   
    })

const connectDb = mongoose.connect(`${process.env.MONGODB_URI}/SonaProject`);

}

module.exports = connectDB;