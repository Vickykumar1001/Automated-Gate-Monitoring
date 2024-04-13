const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for the Vehicle
const suspiciousSchema = new Schema({
  registration_number: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  type: { type: String, required: true },
  owner: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
  crimes: [
    {
      type: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

// Create the Mongoose model
const SuspiciousVehicle = mongoose.model("suspiciousVehicle", suspiciousSchema);

module.exports = SuspiciousVehicle;
