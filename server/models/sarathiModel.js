const mongoose = require("mongoose");

const sarathiSchema = new mongoose.Schema({
  licenseNumber: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  validityNT: {
    type: Date,
    required: true,
  },
  validityTR: {
    type: Date,
    required: true,
  },
  licenseHolder: {
    name: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    organDonor: {
      type: Boolean,
      default: false,
    },
    guardian: {
      type: String,
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
});

const Sarathi = mongoose.model("sarathi", sarathiSchema);

module.exports = Sarathi;
