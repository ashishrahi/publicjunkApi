const cloudinary = require('cloudinary').v2;

const connectCloudinary = async()=>{
    try{
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        console.log('Connected to cloudinary successfully')
    }catch(error){
        console.error('Error connecting to cloudinary', error)
    }
}

module.exports = connectCloudinary