import React, { useState } from "react";
import "./UploadForm.css";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [gateNo, setGateNo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleGateNoChange = (e) => {
    setGateNo(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !gateNo) {
      setErrorMessage("Please select an image and enter gate number");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("gateNo", gateNo);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/home/uploads",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.flag === "green") {
          window.location.assign("http://localhost:3001/successful");
        } else if (data.flag === "suspicious") {
          window.location.assign("http://localhost:3001/suspicious");
        } else if (data.flag === "not_registered") {
          window.location.assign("http://localhost:3001/notregistered");
        }
        // Optionally, you can redirect or perform other actions here
      } else {
        console.error("Upload failed");
        // Optionally, you can display an error message or retry the upload
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Upload Image</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="gateNo">Gate Number:</label>
          <input
            type="text"
            id="gateNo"
            value={gateNo}
            onChange={handleGateNoChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
