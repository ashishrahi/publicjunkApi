const express = require('express')
const router = express.Router();
const { getbyIdGender,createGenders,getGenders,getStatus,updateGenders} = require('../../controller/otherDetails/Gender.controller');

//----------- Create a Gender
router.post('/gender',createGenders);

//------------ Get all Gender
router.get('/',getGenders);

//------------ Get a Gender by ID

router.get('/:id',getbyIdGender);

//------------ Update Gender

router.put('/:id',updateGenders);

//Update a GenderStatus
router.put('/:id/status',getStatus)



//Delete a Gender


module.exports = router;
