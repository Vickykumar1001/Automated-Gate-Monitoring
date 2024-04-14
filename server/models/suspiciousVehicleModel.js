const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the suspicious vehicle
const SuspiciousSchema = new Schema({
  registrationNumber: { type: String, required: true },
  crimes: [
    {
      type: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

// Create the Mongoose model
const SuspiciousVehicle = mongoose.model("suspiciousVehicle", SuspiciousSchema);

module.exports = SuspiciousVehicle;
