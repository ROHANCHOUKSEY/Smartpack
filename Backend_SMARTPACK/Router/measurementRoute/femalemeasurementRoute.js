const express = require("express");
const router = express.Router();
const femaleMeasurementDetails = require("../../Controller/MeasurementController/femaleMeasurementController");
const userAuth = require("../../Config/verifyToken");

//post
router.post("/add-measurement", userAuth, femaleMeasurementDetails.femaleMeasurementDetails);

//get
router.get("/get-measurements", femaleMeasurementDetails.getfemaleMeasurementDetails);

module.exports = router;