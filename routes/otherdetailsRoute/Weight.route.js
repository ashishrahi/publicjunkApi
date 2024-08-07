const express = require('express')
const router = express.Router();
const { createWeights,getWeights,updateStatus,updateWeight,getbyIdWeights} = require('../../controller/otherDetails/Weight.controller');


//Create a Weight
router.post('/weight', createWeights);

//Get a Weight

//Get all Weight
router.get('/', getWeights);

//Get a Weight by id

router.get('/:id', getbyIdWeights)

//Update a Weight
router.put('/:id',updateWeight)

//update Weight status
router.put('/:id/status',updateStatus)


//Delete a Weight


module.exports = router;
