const Banner = require('../../models/bannerModel/banner.model')
const multer = require('multer');
const upload = require('../../middleware/multer.middleware')
const cloudinary = require('../../config/cloudinary.config')




exports.createbanners = async(req,res)=>{

  // ---------------- Image Validation
    const result = await cloudinary.uploader.upload(req.file.path);

  // ------------ Creating Image
    try {
        const newBanner = new Banner({...req.body,image: result.secure_url})
        await newBanner.save()
        res.status(201).json(newBanner)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//---------- All Banner

exports.getAllBanners = async(req,res)=>{
    try {
        const banners = await Banner.find({}).sort({createdAt: -1})
        res.json(banners)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
