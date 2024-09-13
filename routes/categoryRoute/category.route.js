const express = require('express');
const router = express.Router();
const {updateCategory,getCategoryById,createCategories,getCategories,updateCategoryStatus,activeCategoryStatus,inactiveCategoryStatus}= require('../../controller/categoryController/category.controller')
const upload = require('../../middleware/multer.middleware') 

//------------Create a new category
router.post('/create',upload.single('image'),createCategories)

//-------------get Categories
router.get('/',getCategories)

//-------------Category Details
router.get('/:id',getCategoryById)

router.put('/:id',upload.single('file'),updateCategory)


//-------------get status
router.put('/:id/status',updateCategoryStatus)


router.get('/status/true',activeCategoryStatus)

router.get('/status/false',inactiveCategoryStatus)



module.exports = router;