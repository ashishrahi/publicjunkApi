const express = require('express');
const router = express.Router();
const {createPincode,getPincode}= require('../../controller/pincodeController/pincode.controller')
    
//---------createCity
router.post('/create',createPincode)

//--------- getCity
router.get('/',getPincode)


module.exports = router;
