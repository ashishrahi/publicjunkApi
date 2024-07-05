const express = require('express')
const router = express.Router();
const Dandi = require('../../models/otherdetailsModel/Dandi.model')
const {createDandis,getDandis}= require('../../controller/otherDetails/Dandi.controller')


//create Dandi
router.post('/dandi',createDandis)

//get all Dandis
router.get('/',getDandis)

module.exports = router;
