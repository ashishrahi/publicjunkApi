const Subcategory = require("../../models/subcategoryModel/subcategory.model.js");
const multer = require('multer')
const upload = require('../../middleware/multer.middleware.js')
const cloudinary = require('../../config/cloudinary.config');
const Category = require("../../models/categoryModel/category.model.js");

    
/////////////////////////// Create Subcategory ////////////////////////////////////////

    exports.createSubcategories = async(req,res)=>{
        // const registerData = JSON.parse(req.body.values)
        const{categoryname} = req.body;
        const createdData = req.body;

        const findcategory = await Category.findOne({categoryname:categoryname})
        console.log(findcategory)
        const categoryId =findcategory.id;

            try {
            const result = await cloudinary.uploader.upload(req.file.path)
            const newSubcategory = new Subcategory({...createdData,image:result.secure_url,category:categoryId})
            await newSubcategory.save()
            res.status(200).json(newSubcategory)
            }
            catch (error) {
            res.status(500).json(error)
            }}
     
            
///////////////////////////// get Subcategory //////////////////////////////////////////////////

exports.getSubcategoryById = async (req, res) => {
    try {
        const eachSubcategory = await Subcategory.findById(req.params.id)
        if(!eachSubcategory) return res.status(404).send('Subcategory not found')
        res.status(200).json(eachSubcategory)
        }
    catch (error) {
        res.status(500).json(error)
    }
};

///////////////////////////// Update Subcategory /////////////////////////////////////

exports.updateSubcategory = async (req, res) => {
    const{Subcategoryname} = req.body
    
     const result = await cloudinary.uploader.upload(req.file.path)
   try {
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id, {$set:{Subcategoryname:Subcategoryname,image:result.secure_url}}, {new: true})
        if(!updatedSubcategory) return res.status(404).send('Subcategory not found')
        res.status(200).json(updatedSubcategory)
     } 
    catch (error) {
        res.status(500).json(error)
    }
};


///////////////////////////////// get All Categories /////////////////////////////////////
        
        exports.getSubcategories = async (req, res) => {
        try {
        const allCategories = await Subcategory.find({}).sort({createdAt: -1})
        res.status(200).json(allCategories);
         } 
        catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
};

//////////////////////////////// Subcategory Status ////////////////////////////////

exports.updateSubcategoryStatus = async(req,res)=>{
    try {
        const statusSubcategory = await Subcategory.findByIdAndUpdate(req.params.id)
        if(!statusSubcategory) return res.status(404).send('Subcategory not found')
            statusSubcategory.status = !statusSubcategory.status
        await statusSubcategory.save()
        res.status(200).json(statusSubcategory)
    } catch (error) {
        res.status(500).json(error)
    }}

///////////////////////////  Active Subcategory Status ///////////////////////////////////////////////

exports.activeSubcategoryStatus = async(req,res)=>{
    try {
        const activeSubcategory = await Subcategory.find({status:true})
        if(!activeSubcategory) return res.status(404).send('Subcategory not found')
        res.status(200).json(activeSubcategory)
    } catch (error) {
        res.status(500).json(error)
    }
}

//////////////////////////// inActive Subcategory Status /////////////////////////////////////////

exports.inactiveSubcategoryStatus = async(req,res)=>{
    try {
        const inactiveCategories = await Subcategory.find({status:false})
        if(!inactiveCategories) return res.status(404).send('Subcategory not found')
        res.status(200).json(inactiveCategories)
    } catch (error) {
        res.status(500).json(error)
    }
}
