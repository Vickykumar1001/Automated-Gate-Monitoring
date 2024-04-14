const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const Vahan = require("../models/vahanModel");
const VehicleEntryExit = require("../models/vehicleEntryExitModel");
const SuspiciousVehicle = require("../models/suspiciousVehicleModel");

const uploadImage = async (req, res) => {
  const { gateNo } = req.body;
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "vehicle-database",
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
      flag: "notRegistered",
      statement: "Vehicle data not found in Vahan database..!!",
    });
  }
  const suspiciousVehicle = await SuspiciousVehicle.findOne({
    registrationNumber: data.number,
  });
  if (suspiciousVehicle) {
    return res.status(StatusCodes.OK).json({
      flag: "suspicious",
      statement: "Vehicle is found Suspicious!",
      data: suspiciousVehicle,
    });
  }
  let entryExit = "";
  if (gateNo == "1" || gateNo == "2") {
    entryExit = "Entry";
  } else {
    entryExit = "Exit";
  }
  const newVisitedVehicle = {
    vehicleNumber: data.number,
    vehicleTime: new Date(),
    entryExit: entryExit,
    vehicleType: vehicle.vehicleType,
    gateNo: gateNo,
    imgURL: result.secure_url,
  };
  await VehicleEntryExit.create(newVisitedVehicle);
  return res.status(StatusCodes.OK).json({
    flag: "clear",
    statement: "Vehicle Number Verified and entry of vehicle is done.",
    data: vehicle,
  });
};

module.exports = {
  uploadImage,
};
