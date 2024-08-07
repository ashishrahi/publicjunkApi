const express = require('express')
const router = express.Router();
const Dandi = require('../../models/variantModel/Dandi.model')
const {createDandis,getDandis,getDandisStatus,updateDandis,getByIdDandis}= require('../../controller/otherDetails/Dandi.controller')
const upload = require('../../middleware/multer.middleware')

//create Dandi
router.post('/dandi',upload.none(),createDandis)

//get all Dandis
router.get('/',getDandis)

//get get Dandis
router.get('/:id',getByIdDandis)

// get Update Dandis

router.put('/:id',updateDandis)

//get Dandis status

router.put('/:id/status',getDandisStatus)

module.exports = router;
