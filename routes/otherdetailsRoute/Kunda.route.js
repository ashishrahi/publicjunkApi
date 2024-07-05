const express = require('express')
const router = express.Router();
const createError = require('../../utilitiesFunctions/error')
const { createKundas,getKundas,} = require('../../controller/otherDetails/Kunda.controller');


//Create a Kunda
router.post('/kunda',createKundas);

//Get a Kunda

//Get all Kunda
router.get('/',getKundas);

//Update a Kunda

//update Kunda status


//Delete a Kunda


module.exports = router;
