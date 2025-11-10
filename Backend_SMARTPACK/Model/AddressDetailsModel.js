  const mongoose = require("mongoose");

  const AddressDetailSchema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {type:String, required:true},
    phone: { type:Number, required:true},
    addressLine1: {type:String, required:true},
    addressLine2: {type:String},
    city: {type:String, required:true},
    state: {type:String, required:true},
    postalCode: {type:String, required:true},
    // country: {type:String, required:true},
  });  

  module.exports = mongoose.model("Address", AddressDetailSchema);    