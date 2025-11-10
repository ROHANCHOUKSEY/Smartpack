const FemaleMeasurement = require("../../Model/FemaleMeasurementDetailsModel");

//POST API
exports.femaleMeasurementDetails = async (req, res) => {
  try {
    const userid = req.userid;
    const {
      bust,
      waist,
      hips,
      shoulder,
      neck,
      armhole,
      sleeveLength,
      bicep,
      wrist,
      thigh,
      inseam,
      outseam,
    } = req.body;
    const MeasurementDetails = new FemaleMeasurement({
      userid,
      bust,
      waist,
      hips,
      shoulder,
      neck,
      armhole,
      sleeveLength,
      bicep,
      wrist,
      thigh,
      inseam,
      outseam,
    });
    const SaveMeasurementDetails = await MeasurementDetails.save();
    return res.status(200).json({
      success: true,
      message: "Successfully send male measurmentdetails",
      SaveMeasurementDetails,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Not send measurmentdetails", error });
  }
};

//GET API
exports.getfemaleMeasurementDetails = async (req, res) => {
  try {
    const measurementData = await FemaleMeasurement.find(req.body);
    return res.status(200).json({
      success: true,
      message: "Successfully Get Measurement Details",
      measurementData,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Not Get Measurement Details" });
  }
};
