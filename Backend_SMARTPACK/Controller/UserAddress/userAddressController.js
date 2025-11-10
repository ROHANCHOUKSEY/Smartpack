const Address = require("../../Model/AddressDetailsModel");

exports.postUserAddress = async (req, res) => {
  try {

    const userid = req.userid
 
    const { 
      name,
      phone,
      addressLine1, 
      addressLine2,  
      city,
      state,
      postalCode, 
    } = req.body;

    const newAddress = new Address({
      userid,
      name, 
      phone, 
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
    });
    
    const saveAddress = await newAddress.save();

    return res.status(200).json({success:true, message:"Successfully send user address", useraddress: saveAddress});

  } catch (error) {
    return res.status(400).json({success:false, message:"Not send user address", error});
  }

};


exports.getUserAddress = async (req, res) => {
    try{
        const userAddress = await Address.find(req.body);
        return res.status(200).json({success:true, message:"Successfully get user address", userAddress});
    }catch{
        return res.status(400).json({success:false, message:"Not get user address"});
    }
}