const express = require('express')
const router = express.Router();
const createError = require('../../utilitiesFunctions/error')
const { createSizes,getSizes,} = require('../../controller/otherDetails/Size.controller');


//Create a Size
router.post('/size',createSizes);

//Get a Size

//Get all Size
router.get('/',getSizes);

//Update a Size

//update Size status


//Delete a Size


module.exports = router;
