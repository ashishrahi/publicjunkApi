const express = require('express');
const router = express.Router();

const {createCountry,getCountry
}= require('../../controller/countryController/country.controller')
    
//---------createCountry
router.post('/country',createCountry)

//---------getCountry
router.get('/',getCountry)










module.exports = router;
