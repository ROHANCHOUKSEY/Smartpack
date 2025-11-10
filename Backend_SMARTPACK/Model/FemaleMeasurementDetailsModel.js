const mongoose = require("mongoose");

const FemaleMeasurementSchema = new mongoose.Schema(
  {
    // Upper
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    bust: { type: Number, required: true }, // fullest part of chest
    waist: { type: Number, required: true }, // narrowest part of waist
    hips: { type: Number, required: true }, // widest part around hips
    shoulder: { type: Number, required: true }, // shoulder to shoulder
    neck: { type: Number, required: true }, // around base of neck
    armhole: { type: Number, required: true }, // around shoulder + underarm
    sleeveLength: { type: Number, required: true }, // shoulder to wrist
    bicep: { type: Number, required: true }, // upper arm circumference
    wrist: { type: Number, required: true }, // wrist circumference

    // Lower Body
    thigh: { type: Number, required: true }, // around upper thigh
    inseam: { type: Number, required: true }, // crotch to ankle
    outseam: { type: Number, required: true }, // waist to ankle
  },
  { timestamps: true }
);

module.exports = mongoose.model("FemaleMeasurement", FemaleMeasurementSchema);
