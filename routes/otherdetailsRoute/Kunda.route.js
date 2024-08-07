const express = require('express')
const router = express.Router();
const { createKundas,getKundas,getKundasStatus,updateKundas,getIdbyKundas} = require('../../controller/otherDetails/Kunda.controller');
const upload = require('../../middleware/multer.middleware')

//Create a Kunda
router.post('/kunda',upload.none(),createKundas);

//Get all Kunda
router.get('/',getKundas);

// Get Kunda by Id

router.get('/:id',getIdbyKundas);

//Get all Kunda
router.put('/:id',updateKundas);


//Get Update KundaStatus
router.put('/:id/status',getKundasStatus);

module.exports = router;
