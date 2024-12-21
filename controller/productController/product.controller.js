const Product = require("../../models/productModel/product.model.js");
const multer = require('multer')
const upload = require('../../middleware/multer.middleware.js')
const cloudinary = require('../../config/cloudinary.config.js');
const Category = require("../../models/categoryModel/category.model.js");


/////////////////////////// Create Product ////////////////////////////////////////

exports.createProducts = async (req, res) => {
    try {
      const { category, productname, productdescription, price, quantity, size, rating } = req.body;
      const findcategory = await Category.findOne({ categoryname: category });

      if (!findcategory) {
          return res.status(404).json({ message: "Category not found" });
      }
      const categoryId = findcategory._id;
      // Ensure that the category ID is passed
      if (!category) {
        return res.status(400).json({ error: 'Category ID is required' });
      }
  
      // Array to store uploaded image URLs
      let images = [];
  
      // Upload images to Cloudinary if any
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          images.push(result.secure_url);
        }
      }
  
      // Create new Product
      const newProduct = new Product({
        category:categoryId,  // Storing the categoryId
        productname,
        productdescription,
        price,
        quantity,
        size,
        rating,
        image: images,  // Attach uploaded images
      });
  
      await newProduct.save();
  
      return res.status(201).json({
        message: 'Product created successfully',
        product: newProduct,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  


     
            
///////////////////////////////// get Product //////////////////////////////////////////////////

exports.getProductById = async (req, res) => {
    try {
        const eachProduct = await Product.findById(req.params.id)
        if(!eachProduct) return res.status(404).send('Product not found')
        res.status(200).json({
            message:'Product Details has been shown',
            data:eachProduct})
        }
    catch (error) {
        res.status(500).json(error)
    }
};

///////////////////////////// Update Product /////////////////////////////////////

exports.updateProduct = async (req, res) => {
    const{productname} = req.body
    
     const result = await cloudinary.uploader.upload(req.file.path)
   try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:{productname:productname,image:result.secure_url}}, {new: true})
        if(!updatedProduct) return res.status(404).send('Product not found')
        res.status(200).json({
            message:'Product updated successfully',
            data:updatedProduct})
     } 
    catch (error) {
        res.status(500).json(error)
    }
};


///////////////////////////////// get All Categories /////////////////////////////////////
        
        exports.getProducts = async (req, res) => {
        try {
        const allCategories = await Product.find({}).sort({createdAt: -1})
        res.status(200).json({
            message:'List Of all Products',
            data:allCategories});
         } 
        catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
};

//////////////////////////////// Product Status ////////////////////////////////

exports.updateProductStatus = async(req,res)=>{
    try {
        const statusProduct = await Product.findByIdAndUpdate(req.params.id)
        if(!statusProduct) return res.status(404).send('Product not found')
            statusProduct.status = !statusProduct.status
        await statusProduct.save()
        res.status(200).json({
            message:'Product status updated successfully',
            data:statusProduct})
    } catch (error) {
        res.status(500).json(error)
    }}

///////////////////////////  Active Product Status ///////////////////////////////////////////////

exports.activeProductStatus = async(req,res)=>{
    try {
        const activeProduct = await Product.find({status:true})
        if(!activeProduct) return res.status(404).send('Product not found')
        res.status(200).json({
           message:'Product status is active',
            data:activeProduct})
    } catch (error) {
        res.status(500).json(error)
    }
}

//////////////////////////// inActive Product Status /////////////////////////////////////////

exports.inactiveProductStatus = async(req,res)=>{
    try {
        const inactiveCategories = await Product.find({status:false})
        if(!inactiveCategories) return res.status(404).send('Product not found')
        res.status(200).json({
            message:'Product status is inactive',
            data:inactiveCategories})
    } catch (error) {
        res.status(500).json(error)
    }
}
