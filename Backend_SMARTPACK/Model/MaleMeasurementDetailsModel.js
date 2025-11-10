const mongoose = require("mongoose");

const MaleMeasuremnetDetailsSchema = mongoose.Schema({
  userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
  fullShoulder: { type: Number, required: true },
  fullSleeves: { type: Number, required: true },
  fullChest: { type: Number, required: true },
  waist: { type: Number, required: true },
  hips: { type: Number, required: true },
  frontChest: { type: Number, required: true },
  backChestLength: { type: Number, required: true },
  jacket: { type: Number, required: true },
  pantWaist: { type: Number, required: true }, 
  thigh: { type: Number, required: true }, 
  fullCrotch: { type: Number, required: true },
  pantLength: { type: Number, required: true },
  arms: { type: Number, required: true },
  neck: { type: Number, required: true },
});

module.exports = mongoose.model("MaleMeasurement", MaleMeasuremnetDetailsSchema);
     