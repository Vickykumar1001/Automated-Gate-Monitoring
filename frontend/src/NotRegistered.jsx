import React from "react";
import myAudio from "./warning.mp3";
const NotRegistered = () => {
  let audio = new Audio(myAudio);
  audio.play();
  return <h1>Vehicle Not Registered on Vahan Database</h1>;
};

export default NotRegistered;
