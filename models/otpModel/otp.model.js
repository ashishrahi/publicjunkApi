const mongoose = require('mongoose');

const otpSecretSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '5m' } 
});

const OtpSecret = mongoose.model('OtpSecret', otpSecretSchema);

module.exports = OtpSecret;
