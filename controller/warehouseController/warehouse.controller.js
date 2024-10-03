const Warehouse = require('../../models/warehouseModel/warehouse.modal.js')
const multer = require('multer')
const upload = require('../../middleware/multer.middleware.js')
const cloudinary = require('../../config/cloudinary.config')

////////////////////////////////// Create Warehouses  //////////////////////////////////////////////


    exports.createWarehouse = async(req,res)=>{

        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            const newWarehouse = new Warehouse({...req.body,image:result.secure_url})
            await newWarehouse.save()
            res.status(200).json(newWarehouse)
            }
         catch (error) {
            res.status(500).json(error)
            }
        
        }
     


         
////////////////////////////////// Read Warehouses  //////////////////////////////////////////////


// exports.getCategoryById = async (req, res) => {
//     try {
//         const eachcategory = await Category.findById(req.params.id)
//         if(!eachcategory) return res.status(404).send('Category not found')
//         res.status(200).json(eachcategory)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// };

////////////////////////////////// Update Warehouses  //////////////////////////////////////////////


// exports.updateCategory = async (req, res) => {
//     const{categoryname} = req.body
    
//      const result = await cloudinary.uploader.upload(req.file.path)
//    try {
//         const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set:{categoryname:categoryname,image:result.secure_url}}, {new: true})
//         if(!updatedCategory) return res.status(404).send('Category not found')
//         res.status(200).json(updatedCategory)
//      } 
//     catch (error) {
//         res.status(500).json(error)
//     }
// };


////////////////////////////////// All Warehouses  //////////////////////////////////////////////

        
        exports.getWarehouse = async (req, res) => {
        try {
        const allWarehouses = await Warehouse.find({}).sort({createdAt: -1})
        res.status(200).json(allWarehouses);
         } 
        catch (error) {
        console.error('Error fetching warehouses:', error);
        res.status(500).json({ error: error.message });
    }
};

////////////////////////////////// Warehouses Status  //////////////////////////////////////////////


// exports.updateCategoryStatus = async(req,res)=>{
//     try {
//         const statusCategory = await Category.findByIdAndUpdate(req.params.id)
//         if(!statusCategory) return res.status(404).send('Category not found')
//             statusCategory.status = !statusCategory.status
//         await statusCategory.save()
//         res.status(200).json(statusCategory)
//     } catch (error) {
//         res.status(500).json(error)
//     }}

////////////////////////////////// Active Warehouses Status  //////////////////////////////////////////////


// exports.activeCategoryStatus = async(req,res)=>{
//     try {
//         const activeCategory = await Category.find({status:true})
//         if(!activeCategory) return res.status(404).send('Category not found')
//         res.status(200).json(activeCategory)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

////////////////////////////////// InActive Warehouses Status  //////////////////////////////////////////////


// exports.inactiveCategoryStatus = async(req,res)=>{
//     try {
//         const inactiveCategories = await Category.find({status:false})
//         if(!inactiveCategories) return res.status(404).send('Category not found')
//         res.status(200).json(inactiveCategories)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }
