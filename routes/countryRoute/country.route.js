const express = require('express');
const router = express.Router();

const {createCountry,getCountry,updateCountry,updateStatusCountry,getByIdCountry,listCountries
}= require('../../controller/countryController/country.controller')
    
/////////////////////// createCountry //////////////////////////////////////////////////

router.post('/country',createCountry)

//////////////////////// GetbyIdcountry //////////////////////////

router.get('/:id',getByIdCountry)

/////////////////// List of countries  //////////////////////////////////////////////////

router.get('/country/list',listCountries)

/////////////////// getCountries //////////////////////////////////////////////////

router.get('/',getCountry)

///////////////////////// Update Country //////////////////////////////////////////////////////////

router.put('/:id',updateCountry)

/////////////////////////////// Update status //////////////////////////////////////////////////////////

router.put('/:id/status',updateStatusCountry)








module.exports = router;
