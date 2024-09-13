const express = require('express');
const router = express.Router();
const {createCity,getCity}= require('../../controller/cityController/city.controller')
    
//---------createCity
router.post('/create',createCity)

//--------- getCity
router.get('/',getCity)


module.exports = router;
