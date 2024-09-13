const express = require('express');
const router = express.Router();
const {createbookings,getbookings}= require('../../controller/bookingController/booking.controller')
const upload = require('../../middleware/multer.middleware') 

//------------Create a new booking
router.post('/create',createbookings)

//-------------get bookings
router.get('/',getbookings)







module.exports = router;