import React from "react";
import "./VehicleDetails.css"; // Importing CSS for styling
import myAudio from "./success.mp3";
const Successful = () => {
  const vehicleData = {
    registrationNumber: "MH20EJ0365",
    vehicleType: "LMV",
    fuelType: "PETROL",
    make: "Swift",
    model: "Maruti",
    manufacturer: "Maruti Suzuki India Ltd.",
    address: "MG Road, Bangalore",
    ownerName: "Emily Johnson",
    fitnessValidity: "2023-11-12T00:00:00.000+00:00",
    registrationValidity: "2026-12-30T00:00:00.000+00:00",
    puccValidity: "2026-12-20T00:00:00.000+00:00",
    insuranceCompany: "Bajaj Allianz",
    insuranceValidity: "2025-11-30T00:00:00.000+00:00",
    policyNumber: "9876543210",
    pollutionNorms: "BHARAT STAGE VI",
    registrationDate: "2019-12-30T00:00:00.000+00:00",
    mvTax: "30-Dec-2026",
    rcStatus: "ACTIVE",
  };
  let audio = new Audio(myAudio);
  audio.play();
  return (
    <div className="vehicle-details">
      <div className="header">
        <h1>Vehicle Entry Registered</h1>
        <a href="/" className="scan-button">
          Scan More Vehicles
        </a>
      </div>
      <div className="details">
        {Object.entries(vehicleData).map(([key, value]) => (
          <div key={key} className="detail">
            <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Successful;
