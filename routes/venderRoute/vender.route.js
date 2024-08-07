const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../../middleware/multer.middleware');
const {registerVender,updateVenderStatus,getVenders}= require('../../controller/venderController/vender.controller')
    
//---------Register
router.post('/vender',upload.none(),registerVender)

//---------------get Vender
router.get('/',getVenders)

//-------------- updateVenderStatus
router.put('/:id/status',updateVenderStatus)

module.exports = router;
