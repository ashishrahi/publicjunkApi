const Category = require("../../models/categoryModel/category.model.js");
    const multer = require('multer')
    const upload = require('../../middleware/multer.middleware.js')
    const cloudinary = require('../../config/cloudinary.config')

    //------------------------------Create Category

    exports.registerCategories = async(req,res)=>{
        const registerData = JSON.parse(req.body.values)
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            const newCategory = new Category({...registerData,image:result.secure_url})
            await newCategory.save()
            res.status(200).json(newCategory)
            }
         catch (error) {
            res.status(500).json(error)
            }}
     


         
// --------------- get category --------------------

exports.getCategoryById = async (req, res) => {
    try {
        const eachcategory = await Category.findById(req.params.id)
        if(!eachcategory) return res.status(404).send('Category not found')
        res.status(200).json(eachcategory)
    } catch (error) {
        res.status(500).json(error)
    }
};

//-------------- Update Category

exports.updateCategory = async (req, res) => {
    const{categoryname} = req.body
    
     const result = await cloudinary.uploader.upload(req.file.path)
   try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set:{categoryname:categoryname,image:result.secure_url}}, {new: true})
        if(!updatedCategory) return res.status(404).send('Category not found')
        res.status(200).json(updatedCategory)
     } 
    catch (error) {
        res.status(500).json(error)
    }
};


//--------------------------get All Categories
        
        exports.getCategories = async (req, res) => {
        try {
        const allCategories = await Category.find({}).sort({createdAt: -1})
        res.status(200).json(allCategories);
         } 
        catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
};

//---------------------Category Status

exports.updateCategoryStatus = async(req,res)=>{
    try {
        const statusCategory = await Category.findByIdAndUpdate(req.params.id)
        if(!statusCategory) return res.status(404).send('Category not found')
            statusCategory.status = !statusCategory.status
        await statusCategory.save()
        res.status(200).json(statusCategory)
    } catch (error) {
        res.status(500).json(error)
    }}

//--------------------- Active Category Status

exports.activeCategoryStatus = async(req,res)=>{
    try {
        const activeCategory = await Category.find({status:true})
        if(!activeCategory) return res.status(404).send('Category not found')
        res.status(200).json(activeCategory)
    } catch (error) {
        res.status(500).json(error)
    }
}

//--------------------- inActive Category Status

exports.inactiveCategoryStatus = async(req,res)=>{
    try {
        const inactiveCategories = await Category.find({status:false})
        if(!inactiveCategories) return res.status(404).send('Category not found')
        res.status(200).json(inactiveCategories)
    } catch (error) {
        res.status(500).json(error)
    }
}
