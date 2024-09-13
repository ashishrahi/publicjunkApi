const express = require('express');
const router = express.Router();
const {createWarehouse,getWarehouse}= require('../../controller/warehouseController/warehouse.controller')
    
//---------createWarehouse
router.post('/create',createWarehouse)

//--------- getWarehouse
router.get('/',getWarehouse)


module.exports = router;
