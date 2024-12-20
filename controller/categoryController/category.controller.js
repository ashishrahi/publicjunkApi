const Category = require("../../models/categoryModel/category.model.js");
const multer = require('multer')
const upload = require('../../middleware/multer.middleware.js')
const cloudinary = require('../../config/cloudinary.config')

////////////////////////////////// Create Categories  //////////////////////////////////////////////


exports.createCategories = async (req, res) => {
    try {
      // Validation of categories
      const { categoryname } = req.body;
  
      // Check if category already exists
      const findcategory = await Category.findOne({ categoryname: categoryname });
      if (findcategory) {
        return res.status(400).send('Category already exists');
      }
  
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create a new category with the uploaded image URL
      const newCategory = new Category({
        ...req.body,
        image: result.secure_url
      });
  
      // Save the new category to the database
      const newData = await newCategory.save();
  
      // Send success response
      res.status(200).json({
        message: 'New Category has been created successfully',
        data: newData
      });
  
    } catch (error) {
      // Handle errors
      res.status(500).json({
        status: 'error',
        message: error.message || 'An error occurred while creating the category'
      });
    }
  };
  

         
////////////////////////////////// Read Category  //////////////////////////////////////////////


exports.getCategoryById = async (req, res) => {
    try {
        const eachcategory = await Category.findById(req.params.id)
        if(!eachcategory) return res.status(404).send('Category not found')
        res.status(200).json({
                  message:'Category Details !',
                  data:  eachcategory})
        } catch (error) {
        res.status(500).json(error)
    }};

////////////////////////////////// Update Category  //////////////////////////////////////////////


exports.updateCategory = async (req, res) => {
    const{categoryname} = req.body
    
     const result = await cloudinary.uploader.upload(req.file.path)
   try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set:{categoryname:categoryname,image:result.secure_url}}, {new: true})
        if(!updatedCategory) return res.status(404).send('Category not found')
        res.status(200).json({
            message:'Category updated successfully',
            data:
            updatedCategory})
     } 
    catch (error) {
        res.status(500).json(error)
    }
};


////////////////////////////////// All Categories  //////////////////////////////////////////////

        
        exports.getCategories = async (req, res) => {
        try {
        const allCategories = await Category.find({}).sort({createdAt: -1})
        res.status(200).json({
            message:'All Categories have been fetched successfully',
            data:allCategories});
         } 
        catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
};

////////////////////////////////// Categories Status  //////////////////////////////////////////////


exports.updateCategoryStatus = async(req,res)=>{
    try {
        const statusCategory = await Category.findByIdAndUpdate(req.params.id)
        if(!statusCategory) return res.status(404).send('Category not found')
            statusCategory.status = !statusCategory.status
        await statusCategory.save()
        res.status(200).json({
            message:'Category status updated successfully',
            data:statusCategory})
          } 
         catch (error) {
        res.status(500).json(error)
    }}

////////////////////////////////// Active Categories Status  //////////////////////////////////////////////


exports.activeCategoryStatus = async(req,res)=>{
    try {
        const activeCategory = await Category.find({status:true})
        if(!activeCategory) return res.status(404).send('Category not found')
        res.status(200).json({
            message:'Category has been activated!',
            data:activeCategory
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

////////////////////////////////// InActive Categories Status  //////////////////////////////////////////////


exports.inactiveCategoryStatus = async(req,res)=>{
    try {
        const inactiveCategories = await Category.find({status:false})
        if(!inactiveCategories) return res.status(404).send('Category not found')
        res.status(200).json({
            message:'Category has been deactivated!',
            data:inactiveCategories
        })}
     catch (error) {
        res.status(500).json(error)
    }}
