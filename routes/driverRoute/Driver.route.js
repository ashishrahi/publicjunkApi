const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../../middleware/multer.middleware');
const {registerDriver,getDrivers,getbyIdDriver,updateDriverStatus,updateDriverDetails
    ,activeDriverStatus,inactiveDriverStatus,getAssignedDriver
}= require('../../controller/driverController/driver.controller')
    
//---------Register

router.post('/Driver',upload.single('file'),registerDriver)



//-------------- updateDriverStatus

router.put('/:id/status',updateDriverStatus)


//---------------get Driver

router.get('/',getDrivers)

//---------------------get Driver

router.get('/:id',getbyIdDriver)

//................ update Driver Status
router.get('/status/true',activeDriverStatus)

//................ update Driver Status
router.get('/status/false',inactiveDriverStatus)

// ..... updateDriverDetails
router.put('/:id',upload.single('file'),updateDriverDetails)

// ....... getAssignedDriver
router.get('/assignedDriver',getAssignedDriver)






module.exports = router;
