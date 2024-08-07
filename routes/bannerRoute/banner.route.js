const express = require('express');
const router = express.Router()
const {createbanners,getAllBanners}= require('../../controller/bannerController/banner.controller')
const upload = require('../../middleware/multer.middleware')

//----------- Create Banners
router.post('/banner',upload.single('file'), createbanners);

// -------- Get Banners
router.get('/',getAllBanners)

module.exports = router;