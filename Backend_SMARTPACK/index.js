const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//Import Routers
const userAuthRouter = require("./Router/Authentication/userAuthentication_Router");
const maleMeasurementRouter = require("./Router/measurementRoute/malemeasurementRoute");
const femaleMeasurementRouter = require("./Router/measurementRoute/femalemeasurementRoute");
const userAddress = require("./Router/UserAddessRoute/useraddressRoute");

const app = express(); 
 
//Middleware 
app.use(cors({ origin: "http://localhost:5173", credentials:true,  methods:["POST", "GET", "DELETE", "PUT"]}));
app.use(cookieParser());
app.use(express.json());  

// API Routes
app.use("/api/user", userAuthRouter); 
app.use("/malemeasurement", maleMeasurementRouter);
app.use("/femalemeasurement", femaleMeasurementRouter);
app.use("/useraddress", userAddress);

// Database connection and server start
mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database is not connected: ", error);
  });
   