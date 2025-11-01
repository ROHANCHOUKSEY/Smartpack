const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next) => {
    try{
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({success:false, message:"Not Authorized Login Again"});
        }

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userid = decodeToken; 
        next(); 

    }catch(error){
        console.log("Token is not decode: ", error);
    } 
}

module.exports = verifyToken;