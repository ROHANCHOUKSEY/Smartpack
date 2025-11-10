const mongoose = require("mongoose");

const userdeliverydetails = mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    addressId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"Address"},
    maleMeasurmentDetails: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"MaleMeasurement"}, 
    femaleMeasurmentDetails: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"FemaleMeasurement"} 
})

module.exports = userdeliverydetails;    