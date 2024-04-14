const express = require("express");
const router = express.Router();

const {
  getVehicleData,
  createVehicleData,
  getAllVehicleReport,
  createDriverData,
  getDriverData,
} = require("../controllers/detailController");
router.route("/vehicle").post(createVehicleData);
router.route("/vehicle/:vehicleNumber").get(getVehicleData);
router.route("/report").get(getAllVehicleReport);
router.route("/driver").post(createDriverData);
router.route("/driver/:licenseNumber").get(getDriverData);
module.exports = router;
