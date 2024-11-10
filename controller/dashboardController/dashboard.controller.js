const User = require('../../models/userModel/User.model')
const Category = require('../../models/categoryModel/category.model')
const Subcategory = require('../../models/subcategoryModel/subcategory.model')

exports.countItems = async(req,res)=>{
    try {
        // Count the number of users
        const userCount = await User.countDocuments();
    
        // Count the number of categories
        const categoryCount = await Category.countDocuments();
    
        // Count the number of subcategories
        const subcategoryCount = await Subcategory.countDocuments();
    
        // Send the counts in the response
        res.json({
          userCount,
          categoryCount,
          subcategoryCount
        });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
