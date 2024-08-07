const express = require('express')
const router = express.Router();
const {getbyIdSize, createSizes,getSizes,getSizeStatus,updateSizes} = require('../../controller/otherDetails/Size.controller');


//Create a Size
router.post('/size',createSizes);

//Get a Size

//Get all Size
router.get('/',getSizes);

//Get by Id Size

router.get('/:id',getbyIdSize)

//Update a Size
router.put('/:id',updateSizes);

//Delete a Size

//update Size status

router.put('/:id/status',getSizeStatus)


module.exports = router;
