import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleInfo = () => {
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    // Fetch vehicle data from Vahan database
    axios
      .get("https://vahanapi.herokuapp.com/api/search/AP28BN1234")
      .then((response) => {
        setVehicleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  const handleViewInfo = () => {
    // Handle button click to view more information about the vehicle
    console.log("View more info");
    // You can add code here to show more details about the vehicle
  };

  return (
    <div className="vehicle-info-container">
      <h2>Vehicle Information</h2>
      {vehicleData ? (
        <div>
          <p>Registration Number: {vehicleData.RegistrationNumber}</p>
          <p>Owner Name: {vehicleData.OwnerName}</p>
          <p>Vehicle Class: {vehicleData.VehicleClass}</p>
          <p>Registration Date: {vehicleData.RegistrationDate}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading vehicle data...</p>
      )}
      <button onClick={handleViewInfo}>View More Info</button>
    </div>
  );
};

export default VehicleInfo;
