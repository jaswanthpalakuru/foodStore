const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  otp: { type: String },
  createdat: { type: Number, default: new Date().getTime() },
  verified: { type: Boolean, default: false },
  otpRequestedTimes: { type: Number, default: 0 },
  otpCreatedat: { type: Number, default: new Date().getTime() },
});

module.exports = mongoose.model("user", registerSchema);
