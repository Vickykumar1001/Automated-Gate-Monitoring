import React from "react";
import myAudio from "./success.mp3";
function successful() {
  let audio = new Audio(myAudio);
  audio.play();
  return (
    <div
      style={{
        backgroundColor: "#7FFF7F",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Vehicle Data found on Vahan Database.</h1>
      <h3>Entry of vehicle is has been Registered.</h3>
    </div>
  );
}

export default successful;
