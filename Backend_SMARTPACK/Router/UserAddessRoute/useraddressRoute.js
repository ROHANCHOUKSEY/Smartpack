const express = require("express");
const userAddressRouter = express.Router();
const userAddressController = require("../../Controller/UserAddress/userAddressController");
const userAuth = require("../../Config/verifyToken");



//post
userAddressRouter.post("/user-address", userAuth, userAddressController.postUserAddress);


//get
userAddressRouter.get("/getuser-address", userAddressController.getUserAddress);

module.exports = userAddressRouter;        