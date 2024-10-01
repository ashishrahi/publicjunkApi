const express = require('express');
const router = express.Router();
const {createPincode,getPincodeById,getPincodes,getstatusPincode,
    updatePincode
}= require('../../controller/pincodeController/pincode.controller')
    
//---------createPincode
router.post('/pincode',createPincode)

//--------- getPincode
router.get('/',getPincodes)

//--------- getPincodebyId
router.get('/:id',getPincodeById)

//--------- getPincodebystatus
router.get('/:id/status',getstatusPincode)



module.exports = router;
