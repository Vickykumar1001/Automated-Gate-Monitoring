import React from "react";
import myAudio from "./audio.wav";
const Suspicious = () => {
  let audio = new Audio(myAudio);
  audio.play();

  return <h1>Suspicious Vehicle Detected</h1>;
};

export default Suspicious;
