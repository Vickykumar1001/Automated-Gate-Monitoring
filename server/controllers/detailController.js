const Vahan = require("../models/vahanModel");
const Sarathi = require("../models/sarathiModel");
const VehicleEntryExit = require("../models/vehicleEntryExitModel");

// Controller function to fetch vehicle data from Vahan database
const getVehicleData = async (req, res) => {
  const { vehicleNumber } = req.params;
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
const createVehicleData = async (req, res) => {
  // extracting each field from the request body
  const {
    registrationNumber,
    vehicleType,
    fuelType,
    make,
    model,
    manufacturer,
    address,
    ownerName,
    fitnessValidity,
    registrationValidity,
    puccValidity,
    insuranceCompany,
    insuranceValidity,
    policyNumber,
    pollutionNorms,
    registrationDate,
    mvTax,
    rcStatus,
  } = req.body;

  // Creating a new vehicle object with extracted fields
  const newVehicle = new Vahan({
    registrationNumber,
    vehicleType,
    fuelType,
    make,
    model,
    manufacturer,
    address,
    ownerName,
    fitnessValidity,
    registrationValidity,
    puccValidity,
    insuranceCompany,
    insuranceValidity,
    policyNumber,
    pollutionNorms,
    registrationDate,
    mvTax,
    rcStatus,
  });

  // Saving the new vehicle to the database
  await newVehicle.save();

  // Send a success response
  res.status(201).send("Vehicle data added to database");
};
const getAllVehicleReport = async (req, res) => {
  const { search, gate, type, sort, entryExit } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.vehicleNumber = { $regex: search, $options: "i" };
  }
  // add stuff based on condition

  if (entryExit && entryExit !== "all") {
    queryObject.entryExit = entryExit;
  }
  if (type && type !== "all") {
    queryObject.vehicleType = type;
  }
  if (gate && gate !== "all") {
    queryObject.gateNo = gate;
  }

  // NO AWAIT

  let result = VehicleEntryExit.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-vehicleTime");
  }
  if (sort === "oldest") {
    result = result.sort("vehicleTime");
  }
  if (sort === "a-z") {
    result = result.sort("vehicleNumber");
  }
  if (sort === "z-a") {
    result = result.sort("-vehicleNumber");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const vehicles = await result;

  const totalVehicles = await VehicleEntryExit.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalVehicles / limit);

  res.status(200).json({ vehicles, totalVehicles, numOfPages });
};

const getDriverData = async (req, res) => {
  const { licenseNumber } = req.params;
  console.log(licenseNumber);
  // Find the driver details in the database by licence number
  const driverDetails = await Sarathi.findOne({
    licenseNumber: licenseNumber,
  });
  console.log(driverDetails);
  // Check if driver data exists
  if (!driverDetails) {
    return res.status(404).json({ error: "Driver details not found" });
  }

  // Send the driver details as a response
  res.status(200).json(driverDetails);
};

const createDriverData = async (req, res) => {
  // Extracting each field from the request body
  const {
    licenseNumber,
    issuedBy,
    issueDate,
    validityNT,
    validityTR,
    name,
    bloodGroup,
    dateOfBirth,
    organDonor,
    guardian,
    street,
    city,
    state,
    pincode,
  } = req.body;

  // Creating a new driver object with the extracted fields
  const newDriver = new Sarathi({
    licenseNumber,
    issuedBy,
    issueDate,
    validityNT,
    validityTR,
    licenseHolder: {
      name,
      bloodGroup,
      dateOfBirth,
      organDonor,
      guardian,
    }, // Directly using the nested object from request body
    address: {
      street,
      city,
      state,
      pincode,
    }, // Directly using the nested object from request body
  });

  // Saving the new driver to the database
  await newDriver.save();

  // Send a success response
  res.status(201).send("Driver data added to database");
};
module.exports = {
  getVehicleData,
  createVehicleData,
  getAllVehicleReport,
  getDriverData,
  createDriverData,
};
