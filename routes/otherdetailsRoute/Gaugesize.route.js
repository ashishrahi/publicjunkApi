const express = require('express')
const router = express.Router();
const Gaugesize = require('../../models/variantModel/Gaugesize.model')
const {getbyIdGaugesize,createGaugesize,getGaugesize,getGaugesizeStatus,updateGaugesize}= require('../../controller/otherDetails/Gaugesize.controller')


//create Gaugesize
router.post('/gaugesize',createGaugesize)

//get all Gaugesize
router.get('/',getGaugesize)

// get a Gaugesize by id

router.get('/:id', getbyIdGaugesize)

// update Gaugesize
router.put('/:id',updateGaugesize)

// get Gaugesize Status
router.put('/:id/status',getGaugesizeStatus)

module.exports = router;
