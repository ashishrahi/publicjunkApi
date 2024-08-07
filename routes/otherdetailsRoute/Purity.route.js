const express = require('express')
const router = express.Router();
const { createPurities,getPurities,getPurityStatus,updatePurity,getbyIdPurities} = require('../../controller/otherDetails/Purity.controller');
const upload = require('../../middleware/multer.middleware')

//Create a Purity
router.post('/purity',upload.none(),createPurities);

//Get a Purity

//Get all Purity
router.get('/',getPurities);

//Get Purity by id

router.get('/:id', getbyIdPurities);

//Get Purity status
router.put('/:id/status',getPurityStatus);

//Update a Purity
router.put('/:id',updatePurity);
//update Purity status


//Delete a Purity


module.exports = router;
