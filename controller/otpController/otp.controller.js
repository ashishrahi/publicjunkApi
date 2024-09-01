const speakeasy = require('speakeasy');
const OtpSecret = require('../../models/otpModel/otp.model');
const axios = require('axios');

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

exports.sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  const secret = speakeasy.generateSecret({ length: 20 });
  console.log(secret.base32);
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32'
  });

  try {
    // Save OTP secret to MongoDB
    await OtpSecret.findOneAndUpdate(
      { phoneNumber },
      { secret: secret.base32, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send OTP via SMS using Twilio
    // await axios.post('https://api.twilio.com/2010-04-01/Accounts/' + TWILIO_ACCOUNT_SID + '/Messages.json', null, {
    axios.post(`${twilioApiUrl}${accountSid}/Messages.json`,null,{
    params: {
        To: phoneNumber,
        From: TWILIO_PHONE_NUMBER,
        Body: `Your OTP code is: ${otp}`
      },
      auth: {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN
      }
    });

    res.status(200).send('OTP sent');
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
};
exports.verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const otpSecret = await OtpSecret.findOne({ phoneNumber });

    if (!otpSecret) {
      return res.status(400).send('OTP expired or invalid phone number');
    }

    const verified = speakeasy.totp.verify({
      secret: otpSecret.secret,
      encoding: 'base32',
      token: otp,
      window: 1 // Adjust window as needed
    });

    if (verified) {
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    res.status(500).send('Error verifying OTP');
  }
};


