const express = require("express");
const userAuthRouter = express.Router();
const UserAuthController = require("../../Controller/UserAuthentication/userAuthenticationController");
const verifytoken = require("../../Config/verifyToken");

//// Registration & Login
userAuthRouter.post("/register", UserAuthController.registerUser);
userAuthRouter.post("/login", UserAuthController.userLogin);
userAuthRouter.post("/logout", UserAuthController.userLogOut);

// Email verification
userAuthRouter.post("/send-verify-otp", verifytoken, UserAuthController.sendOtp);
userAuthRouter.post("/verify-otp",verifytoken, UserAuthController.verifyOtp);

// Password reset
userAuthRouter.post("/send-reset-otp", UserAuthController.resetPassword);
userAuthRouter.post("/verify-reset-otp", verifytoken, UserAuthController.verifyResetOtp);
userAuthRouter.post("/change-password",verifytoken, UserAuthController.newPassword);

//profile
userAuthRouter.get("/profile", verifytoken, (req, res, next) => {
  res.json({ message: `Welcome back! Your email is ${req.user.email}`});
});
 
module.exports = userAuthRouter; 