const express = require('express');
const router = express.Router();
const {updateSubcategory,getSubcategoryById,createSubcategories,getSubcategories,updateSubcategoryStatus,activeSubcategoryStatus,inactiveSubcategoryStatus}= require('../../controller/subcategoryController/subcategory.controller')
const upload = require('../../middleware/multer.middleware') 

//------------Create a new category
router.post('/create',upload.single('image'),createSubcategories)

//-------------get Categories
router.get('/',getSubcategories)

//-------------Category Details
router.get('/:id',getSubcategoryById)

router.put('/:id',upload.single('file'),updateSubcategory)


//-------------get status
router.put('/:id/status',updateSubcategoryStatus)


router.get('/status/true',activeSubcategoryStatus)

router.get('/status/false',inactiveSubcategoryStatus)



module.exports = router;