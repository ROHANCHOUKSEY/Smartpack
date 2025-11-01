const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {  
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address",
    },
  }, 
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  userotp: { type: String, default: "" },
  isOptVerified: { type: Boolean, default: false },
  resetUserOtp: { type: String, default: "" },
  OtpExpireAt: { type: Number, default: 0 },
  mearsurement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaleMeasurement",
  },
});

module.exports = mongoose.model("User", userSchema);
  