const express = require('express');
const router = express.Router();

const {countItems}= require('../../controller/dashboardController/dashboard.controller')
    
/////////////////////// createCountry //////////////////////////////////////////////////

router.post('/counts',countItems)










module.exports = router;
