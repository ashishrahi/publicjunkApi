const express = require('express')
const router = express.Router();
const createError = require('../../utilitiesFunctions/error')
const { createWeights,getWeights,} = require('../../controller/otherDetails/Weight.controller');


//Create a Weight
router.post('/weight', createWeights);

//Get a Weight

//Get all Weight
router.get('/', getWeights);

//Update a Weight

//update Weight status


//Delete a Weight


module.exports = router;
