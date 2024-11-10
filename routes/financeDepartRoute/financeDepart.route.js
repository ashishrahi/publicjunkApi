const express = require('express');
const router = express.Router();
const {createfinanceDepart,getfinanceDepart} = require('../../controller/financeDepart.controller.js/financeDepart.controller')
    
////////////////////////// CreatefinanceDepart //////////////////////////////////////////// 

router.post('/create',createfinanceDepart)

///////////////////////////  getfinanceDepart /////////////////////////////////////////////////// 

router.get('/',getfinanceDepart)


module.exports = router;
