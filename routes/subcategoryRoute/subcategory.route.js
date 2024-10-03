const express = require('express');
const router = express.Router();
const {updateSubCategory,getSubCategoryById,createSubCategories,getSubCategories,updateSubCategoryStatus,activeSubCategoryStatus,inactiveSubCategoryStatus}= require('../../controller/subcategoryController/subcategory.controller')
const upload = require('../../middleware/multer.middleware') 

//------------Create a new subcategory
router.post('/create',upload.single('image'),createSubCategories)

//-------------get SubCategories
router.get('/',getSubCategories)

//-------------SubCategory Details
router.get('/:id',getSubCategoryById)

router.put('/:id',upload.single('file'),updateSubCategory)


//-------------get status
router.put('/:id/status',updateSubCategoryStatus)


router.get('/status/true',activeSubCategoryStatus)

router.get('/status/false',inactiveSubCategoryStatus)



module.exports = router;