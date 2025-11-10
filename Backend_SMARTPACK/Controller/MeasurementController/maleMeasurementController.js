const MaleMeasurement = require("../../Model/MaleMeasurementDetailsModel");

//POST API
exports.maleMeasurementDetails = async (req, res) => {
  try {
    const userid = req.userid;
    const {
      fullShoulder,
      fullSleeves,
      fullChest,
      waist,
      hips,
      frontChest,
      backChestLength, 
      jacket,
      pantWaist,
      thigh, 
      fullCrotch,
      pantLength,
      arms,
      neck,
    } = req.body;

    const MeasurementDetails = new MaleMeasurement({ 
      userid,      
      fullShoulder,
      fullSleeves,
      fullChest,
      waist,
      hips,
      frontChest, 
      backChestLength,
      jacket, 
      pantWaist,  
      thigh,
      fullCrotch,
      pantLength,
      arms,
      neck,
    });

    const SaveMeasurementDetails = await MeasurementDetails.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Successfully send male measurmentdetails",
        maleMeasurementDetails: SaveMeasurementDetails,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Not send measurmentdetails", error });
  }
};

//GET API
exports.getmaleMeasurementDetails = async () => {
  try {
    const measurementData = await MaleMeasurement.find(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Successfully Get Measurement Details", measurementData });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Not Get Measurement Details" });
  }
};
