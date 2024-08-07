const express = require('express')
const router = express.Router();
const Color = require('../../models/variantModel/Color.model')
const {createColors,getColors,deleteColors,updateColor,updateColorStatus,getColor}= require('../../controller/otherDetails/Color.controller')

//create Color
router.post('/color',createColors)

//get all colors
router.get('/',getColors)

//get a color
router.get('/:id',getColor)

// delete Colors
router.delete('/:id',deleteColors)

// update Colors
router.put('/:id',updateColor)

//update status
router.put('/:id/status',updateColorStatus)


module.exports = router;
