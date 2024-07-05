const express = require('express')
const router = express.Router();
const createError = require('../../utilitiesFunctions/error')
const { createPurities,getPurities,} = require('../../controller/otherDetails/Purity.controller');


//Create a Parity
router.post('/purity',createPurities);

//Get a Parity

//Get all Parity
router.get('/',getPurities);

//Update a Parity

//update Parity status


//Delete a Parity


module.exports = router;
