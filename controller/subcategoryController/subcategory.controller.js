    const multer = require('multer')
const upload = require('../../middleware/multer.middleware.js')
const cloudinary = require('../../config/cloudinary.config');
const Subcategory = require("../../models/subcategoryModel/subcategory.model.js");

////////////////////////////////// Create SubCategories  //////////////////////////////////////////////


    exports.createSubCategories = async(req,res)=>{
        try {
        const { categoryname } = req.body;
        console.log(req.body)
            const result = await cloudinary.uploader.upload(req.file.path)
            const newsubCategory = new Subcategory({...req.body,image:result.secure_url,category:categoryname})
            await newsubCategory.save()
            res.status(200).json({
                message:'New Subcategory saved successfully',
                data:newsubCategory})
            }
         catch (error) {
            res.status(500).json(error)
            }
        
        }
     

        // count subcategories
exports.countSubcategories = async(req,res)=>{
    try {
        const subcategoryCount = await Subcategory.countDocuments();
        res.status(200).json({
            message: 'Subcategories has been counted successfully',
            data:subcategoryCount});
           } 
      catch (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ error: "An error occurred while counting users" });
       }
}

         
////////////////////////////////// Read SubCategories  //////////////////////////////////////////////


exports.getSubCategoryById = async (req, res) => {
    try {
        const eachSubcategory = await Subcategory.findById(req.params.id)
        if(!eachSubcategory) return res.status(404).send('Subcategory not found')
        res.status(200).json({
            message:'Subcategory Details',
            data:eachSubcategory})
    } catch (error) {
        res.status(500).json(error)
    }
};

////////////////////////////////// Update SubCategories  //////////////////////////////////////////////


exports.updateSubCategory = async (req, res) => {
    try {
    const{subcategoryname} = req.body
         const result = await cloudinary.uploader.upload(req.file.path)
        const updatedSubCategory = await Category.findByIdAndUpdate(req.params.id, {$set:{categoryname:subcategoryname,image:result.secure_url}}, {new: true})
        if(!updatedSubCategory) return res.status(404).send('SubCategory not found')
        res.status(200).json({
            message:'SubCategory updated successfully',
            data:updatedSubCategory})
     } 
    catch (error) {
        res.status(500).json(error)
    }
};


////////////////////////////////// All SubCategories  //////////////////////////////////////////////

        
        exports.getSubCategories = async (req, res) => {
        try {
        const allSubcategories = await Subcategory.find({}).sort({createdAt: -1}).populate('category')
        const formattedsubcategory = allSubcategories.map(subcategory => ({
            _id: subcategory._id,
            categoryname: subcategory.category?.categoryname,
            subcategoryname: subcategory.subcategoryname,
            image:subcategory.image,
            subcategordescription:subcategory.subcategorydescription,
            priceWithUnit:subcategory.priceWithUnit,
            status: subcategory.status, 
            createdAt:subcategory.createdAt

        }));
        res.status(200).json({
            message:'List Of Subcategories',
            data:formattedsubcategory});
         } 
        catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: error.message });
    }
};

////////////////////////////////// SubCategories Status  //////////////////////////////////////////////


exports.updateSubCategoryStatus = async(req,res)=>{
    try {
        const statusSubCategory = await SubCategoryCategory.findByIdAndUpdate(req.params.id)
        if(!statusSubCategory) return res.status(404).send('SubCategory not found')
            statusSubCategory.status = !statusSubCategory.status
        await statusSubCategory.save()
        res.status(200).json({
            message:'SubCategory status has been updated successfully',
            data:statusSubCategory})
    } catch (error) {
        res.status(500).json(error)
    }}

////////////////////////////////// Active SubCategories Status  //////////////////////////////////////////////


exports.activeSubCategoryStatus = async(req,res)=>{
    try {
        const activeSubCategory = await SubCategoryCategory.find({status:true})
        if(!activeSubCategory) return res.status(404).send('SubCategory not found')
        res.status(200).json({
            message: 'List of Active Sub Categories',
            data:activeSubCategory})
    } catch (error) {
        res.status(500).json(error)
    }
}

////////////////////////////////// InActive SubCategories Status  //////////////////////////////////////////////


exports.inactiveSubCategoryStatus = async(req,res)=>{
    try {
        const inactiveSubCategories = await SubCategory.find({status:false})
        if(!inactiveSubCategories) return res.status(404).send('SubCategory not found')
        res.status(200).json({
            message:'List of Inactive Subcategory Status',
            data:inactiveSubCategories})
    } catch (error) {
        res.status(500).json(error)
    }
}
