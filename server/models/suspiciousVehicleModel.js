const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the simplified suspicious vehicle
const SuspiciousSchema = new Schema({
  registration_number: { type: String, required: true },
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
