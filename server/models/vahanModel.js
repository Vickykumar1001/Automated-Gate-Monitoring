const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the vehicle data
const vahanSchema = new Schema({
  registrationNumber: { type: String, required: true },
  vehicleType: {
    type: String,
    enum: ["LMV", "HMV", "MCWG", "MCWOG"],
    required: true,
  },
  fuelType: {
    type: String,
    enum: ["PETROL", "DIESEL", "CNG", "LPG", "ELECTRIC"],
    required: true,
  },
  make: { type: String, required: true },
  model: { type: String, required: true },
  manufacturer: { type: String, required: true },
  address: { type: String, required: true },
  ownerName: { type: String },
  fitnessValidity: { type: Date },
  registrationValidity: { type: Date },
  puccValidity: { type: Date },
  insuranceCompany: { type: String },
  insuranceValidity: { type: Date },
  policyNumber: { type: String },
  pollutionNorms: { type: String },
  registrationDate: { type: Date },
  mvTax: { type: String },
  rcStatus: { type: String, enum: ["ACTIVE", "INACTIVE"], required: true },
});

// Create the Mongoose model
const Vahan = mongoose.model("vahan", vahanSchema);

module.exports = Vahan;
