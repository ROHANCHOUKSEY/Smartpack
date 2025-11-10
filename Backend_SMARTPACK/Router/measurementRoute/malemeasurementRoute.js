const express = require("express");
const router = express.Router();

const maleMeasurementDetails = require("../../Controller/MeasurementController/maleMeasurementController");
const userAuth = require("../../Config/verifyToken");

router.post("/add-measurement", userAuth, maleMeasurementDetails.maleMeasurementDetails);
router.get("/get-measurements", maleMeasurementDetails.getmaleMeasurementDetails);

module.exports = router   