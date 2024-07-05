const express = require('express')
const router = express.Router();
const Color = require('../../models/otherdetailsModel/Color.model')
const {createColors,getColors,deleteColors,updateColor}= require('../../controller/otherDetails/Color.controller')


//create Color
router.post('/color',createColors)

//get all colors
router.get('/',getColors)

// delete Colors
router.delete('/:id',deleteColors)

// update Colors
router.patch('/:id',updateColor)


module.exports = router;
