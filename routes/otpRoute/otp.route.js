const express = require('express');
const { sendOtp, verifyOtp } = require('../../controller/otpController/otp.controller');

const router = express.Router();

// Define the route for sending OTP
router.post('/send-otp', sendOtp);

// Define the route for verifying OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;
