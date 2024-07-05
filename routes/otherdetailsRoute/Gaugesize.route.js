const express = require('express')
const router = express.Router();
const Gaugesize = require('../../models/otherdetailsModel/Gaugesize.model')
const {createGaugesize,getGaugesize}= require('../../controller/otherDetails/Gaugesize.controller')


//create Gaugesize
router.post('/gaugesize',createGaugesize)

//get all Gaugesize
router.get('/',getGaugesize)

module.exports = router;
