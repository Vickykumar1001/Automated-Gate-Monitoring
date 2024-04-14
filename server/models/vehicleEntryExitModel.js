const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the vehicle entry and exit report
const vehicleEntryExitSchema = new Schema({
  vehicleNumber: { type: String, required: true },
  vehicleTime: { type: Date, required: true },
  entryExit: { type: String, enum: ["Entry", "Exit"], required: true },
  vehicleType: {
    type: String,
    enum: ["LMV", "HMV", "MCWG", "MCWOG"],
    required: true,
  },
  gateNo: { type: String },
  imgURL: { type: String },
});

// Create the Mongoose model
const VehicleEntryExit = mongoose.model(
  "vehicle_report",
  vehicleEntryExitSchema
);

module.exports = VehicleEntryExit;
