const express = require('express');
const router = express.Router();
const {registerCategories,getCategories}= require('../../controller/categoryController/category.controller')
    
//Register
router.post('/category',registerCategories)

//get Categories
router.get('/',getCategories)
//karigar

module.exports = router;