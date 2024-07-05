const express = require('express')
const router = express.Router();
const createError = require('../../utilitiesFunctions/error')
const { createGenders,getGenders,} = require('../../controller/otherDetails/Gender.controller');


//Create a Gender
router.post('/gender',createGenders);

//Get a Gender

//Get all Gender
router.get('/',getGenders);

//Update a Gender

//update Gender status


//Delete a Gender


module.exports = router;
