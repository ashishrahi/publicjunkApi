const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer.middleware')

const {createAbout,getAbout,deleteAbout,getbyIdAbout,updateAbout}= require('../../controller/aboutController/about.controller')

// Create About
router.post('/about',upload.none(),createAbout)

// Get About
router.get('/',getAbout)

// Get by Id About
router.get('/:id',getbyIdAbout)

// Update About
router.put('/:id',updateAbout)

//delete About
router.delete('/id',deleteAbout)

module.exports = router