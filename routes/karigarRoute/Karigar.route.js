const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../../middleware/multer.middleware');
const {registerKarigar,getKarigars,getbyIdKarigar,updateKarigarStatus,updateKarigarDetails
    ,activeKarigarStatus,inactiveKarigarStatus
}= require('../../controller/karigarController/karigar.controller')
    
//---------Register

router.post('/karigar',upload.single('file'),registerKarigar)

//------------karigar with category


//-------------- updateKarigarStatus

router.put('/:id/status',updateKarigarStatus)


//---------------get Karigar

router.get('/',getKarigars)

//---------------------get Karigar

router.get('/:id',getbyIdKarigar)

//................ update Karigar Status
router.get('/status/true',activeKarigarStatus)

//................ update Karigar Status
router.get('/status/false',inactiveKarigarStatus)


router.put('/:id',upload.single('file'),updateKarigarDetails)






module.exports = router;
