const express = require('express');
const router = express.Router();
const {updateProduct,getProductById,createProducts,getProducts,updateProductStatus,activeProductStatus,inactiveProductStatus}= require('../../controller/productController/product.controller')
const upload = require('../../middleware/multer.middleware') 

//------------Create a new category
router.post('/create',upload.array('image'),createProducts)

//-------------get Categories
router.get('/',getProducts)

//-------------Category Details
router.get('/:id',getProductById)

router.put('/:id',upload.single('file'),updateProduct)


//-------------get status
router.put('/:id/status',updateProductStatus)


router.get('/status/true',activeProductStatus)

router.get('/status/false',inactiveProductStatus)



module.exports = router;