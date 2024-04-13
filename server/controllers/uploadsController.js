const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Vahan = require("../models/vahanModel");
const VehicleEntryExit = require("../models/vehicleEntryExitModel");
const SuspiciousVehicle = require("../models/sucpiciousModel");

// Controller function to fetch vehicle data from Vahan database
const getVehicleData = async (req, res) => {
  const { vehicleNumber } = req.params;
  console.log(vehicleNumber);
  // Find the vehicle data in the database by registration number
  const vehicleData = await Vahan.findOne({
    registrationNumber: vehicleNumber,
  });

  // Check if vehicle data exists
  if (!vehicleData) {
    return res.status(404).json({ error: "Vehicle data not found" });
  }

  // Send the vehicle data as a response
  res.status(200).json(vehicleData);
};
const uploadImage = async (req, res) => {
  const { gateNo } = req.body;
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);

  const postData = {
    url: result.secure_url,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };
  const response = await fetch("http://127.0.0.1:5000/get_text", options);
  const data = await response.json();
  const vehicle = await Vahan.findOne({ registrationNumber: data.number });
  if (!vehicle) {
    return res.status(StatusCodes.OK).json({
      flag: "not_registered",
      statement: "Vehicle Not Registered in Vahan Database..!!",
    });
  }
  const suspiciousVehicle = await SuspiciousVehicle.findOne({
    registration_number: data.number,
  });
  if (suspiciousVehicle) {
    return res
      .status(StatusCodes.OK)
      .json({ flag: "suspicious", statement: "Vehicle is found Suspicious!" });
  }
  let entryExit = "";
  if (gateNo == "1" || gateNo == "2") {
    entryExit = "Entry";
  } else {
    entryExit = "Exit";
  }
  const newVisitedVehicle = {
    checkInTime: new Date(),
    registrationNumber: data.number,
    checkGateNo: 1,
    vehicleNumber: data.number,
    vehicleTime: new Date(),
    entryExit: entryExit,
    gateNo: gateNo,
  };
  await VehicleEntryExit.create(newVisitedVehicle);
  return res.status(StatusCodes.OK).json({
    flag: "green",
    statement:
      "Vehicle Data found on Vahan Database and Entry of vehicle is done.",
  });
};

module.exports = {
  uploadImage,
  getVehicleData,
};
