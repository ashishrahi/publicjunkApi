const express = require('express');
const router = express.Router();
const {createWarehouse,getWarehouse}= require('../../controller/warehouseController/warehouse.controller')
const upload = require('../../middleware/multer.middleware') 
    
//---------createWarehouse
router.post('/create',upload.single('image'),createWarehouse)

//--------- getWarehouse
router.get('/',getWarehouse)


module.exports = router;
